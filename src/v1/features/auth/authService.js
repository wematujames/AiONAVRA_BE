const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const qrCode = require("qrcode");
const { authenticator } = require("otplib");
const smsQueue = require("../../queues/smsQueue");
const { ErrorResponse } = require("../../utils");
const emailQueue = require("../../queues/emailQueue");
const baseService = require("../common/baseService");
const { frontEnd } = require("../../config/app");
const {
    User, RevokedToken, Token,
} = require("../../../models");

module.exports = {
    ...baseService(User),

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async generateQrImage(user) {
        const secret = authenticator.generateSecret();
        const uri = authenticator.keyuri(user.id, frontEnd.adminAppUrl, secret);
        const qrImage = qrCode.toDataURL(uri);

        await User.updateOne({ _id: user.id }, {
            "multiFA.tempSecret": secret,
        });

        return { qrImage: await qrImage };
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async enable2FACode(user, verficationCode) {
        const isValidCode = authenticator.check(verficationCode, user.multiFA.tempSecret);

        if (!isValidCode) {
            throw new ErrorResponse("Invalid verification code", 400);
        }

        if (!user.multiFA?.tempSecret || user.multiFA.tempSecret !== "N/A") {
            await User.updateOne({ _id: user.id }, {
                "multiFA.enabled": true,
                "multiFA.secret": user.multiFA.tempSecret,
                "multiFA.tempSecret": "N/A",
                "multiFA.backupCodes": new Array(6).map(() => crypto.randomBytes(7).toString("hex")),
            });
        }

        return { multiFAEnabled: isValidCode };
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async login(data) {
        const { email, password } = data;

        const user = await User.findOne({ email }).select(
            "+password +resetPasswordExpire +resetPasswordToken "
            + "+otpCode +otpCodeExpire +loginToken +loginTokenExpire",
        );

        if (!user) throw new ErrorResponse("Invalid credentials", 400);

        if (user.accountLock?.active) {
            throw new Error("Account Locked. Please Contact Administrator or reset your password", 403);
        }

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) {
            const _user = await User.findOneAndUpdate({ _id: user._id }, {
                $inc: { "accountLock.loginAttempts": 1 },
            }, { new: true });

            if (_user.accountLock.loginAttempts >= 5) {
                await User.updateOne(
                    { _id: user._id },
                    { $set: { "accountLock.active": true } },
                );
            }

            const message = user.accountLock.loginAttempts >= 5
                ? "Account Locked. Please Contact Administrator or reset your password"
                : `Invalid credentials. Attempts remaining: ${5 - user.accountLock.loginAttempts}`;

            throw new ErrorResponse(message, 400);
        }

        if (!user.active) throw new ErrorResponse("User is inactive", 403);

        await User.updateOne(
            { _id: user._id },
            { $set: { "accountLock.loginAttempts": 0 } },
        );

        if (!user.multiFA?.enabled) {
            const jwToken = await user.getSignedJwtToken({
                id: user.id,
                type: "CompanyUserAuth",
            });

            return { multiFAEnabled: false, token: jwToken };
        }

        return { multiFAEnabled: true, loginToken: await user.generateToken("login") };
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async login2fa(data) {
        const { loginToken, verificationCode } = data;

        const token = await Token.findOne({
            "login.token": crypto.createHash("SHA256").update(loginToken).digest("hex"),
        });

        if (!token) throw new ErrorResponse("Invalid/expired login token", 400);

        const user = await User.findById(token.user).select(
            "+password +resetPasswordExpire +resetPasswordToken "
            + "+otpCode +otpCodeExpire +loginToken +loginTokenExpire",
        ).populate({ path: "tokens", select: "login" });

        if (!user) throw new ErrorResponse("Invalid/expired login token", 400);

        const isValidLoginToken = await user.isValidToken("login", loginToken);

        if (!isValidLoginToken) throw new ErrorResponse("Expired/invalid login token", 400);

        const isValidVerificationCode = authenticator.check(verificationCode, user.multiFA.secret);

        if (!isValidVerificationCode) throw new ErrorResponse("Invalid Verifcation Code", 400);

        const jwToken = await user.getSignedJwtToken({ type: "platformAuth" });

        token.login = undefined;
        await token.save();

        return { token: jwToken };
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async requestOTP(data) {
        const { email, password } = data;

        const user = await User.findOne({ email }).select(
            "+password +resetPasswordExpire +resetPasswordToken "
            + "+otpCode +otpCodeExpire +loginToken +loginTokenExpire",
        );

        if (!user) throw new ErrorResponse("Invalid credentials", 400);

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) throw new ErrorResponse("Invalid credentials", 400);

        const otpCode = await user.genOTP();

        smsQueue.dispatch({
            to: user.phone,
            message: `Your OTP code is: ${otpCode}. Expires in 5 minutes.`,
        });

        return user.getLoginToken();
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async savePushtoken(token, user) {
        await Token.updateOne({ _id: user.tokens }, { pushToken: token });
    },

    /**
     * @param {string | number} id logged user's id
     * @param {*} updates user fields to update
     */
    async updateUserDetails(id, data = {}) {
        const user = await User.findById(id).select("+password");

        if (!user) throw new ErrorResponse("User not found", 404);

        const isValidPassword = await user.isValidPassword(data.password);

        if (!isValidPassword) throw new ErrorResponse("Invalid password", 400);

        Object.keys(data || {}).forEach((key) => {
            user[key] = data[key];
        });

        await user.save();

        return user;
    },

    /**
     * @param {string | number} id logged user's id
     * @param {*} updates user fields to update
     */
    async updateEmail(id, data = {}) {
        const user = await User.findById(id).select("+password +oldEmails");

        if (!user) throw new ErrorResponse("User not found", 404);

        const isValidPassword = await user.isValidPassword(data.password);

        if (!isValidPassword) throw new ErrorResponse("Invalid password", 404);

        user.oldEmails = [...new Set(user.oldEmails)];
        user.email = data.newEmail;
        user.emailVerified = false;
        await user.save();

        const verifyEmailToken = await user.generateToken("verifyEmail");

        await emailQueue.dispatch(
            user.email,
            "Verify your new email address",
            {
                name: `${user.fName} + ${user.lName}`,
                verifyEmailUrl: `${frontEnd.adminVerifyEmailUrl}?token=${verifyEmailToken}`,
            },
            "user_email_verification",
        );
    },

    /**
     * @param {string} resetToken reset token issued to user
     * @param {*} newPassword new password of user
     */
    async verifyEmail(verificationToken) {
        const token = await Token.findOne({
            "verifyEmail.token": crypto.createHash("SHA256").update(verificationToken).digest("hex"),
        });

        if (!token) throw new ErrorResponse("Invalid / expired token", 400);

        const user = await User.findById(token.user);

        if (!user) throw new ErrorResponse("Invalid / expired token", 400);

        const isValidEmailToken = await user.isValidToken("verifyEmail", verificationToken);

        if (!isValidEmailToken) throw new ErrorResponse("Invalid / expired token here", 400);

        token.verifyEmail = undefined;
        await token.save();

        user.emailVerified = true;
        await user.save();
    },

    /**
     * @param {string | number} id logged user's id
     * @param {*} updates user fields to update
     */
    async updateUserMobile(id, data = {}) {
        const user = await User.findById(id).select("+password -permissions");

        if (!user) throw new ErrorResponse("User not found", 404);

        const isValidPassword = await user.isValidPassword(data.password);

        if (!isValidPassword) throw new ErrorResponse("Invalid password", 400);

        user.oldPhones = [...new Set(user.oldPhones)];
        user.phone = data.newPhone;
        user.phoneVerified = false;

        await user.save();
    },

    /**
     * @param {string} resetToken reset token issued to user
     * @param {*} newPassword new password of user
     */
    async verifyPhone(otpCode, user) {
        const token = await Token.findOne({
            user: user.id,
            "verifyPhone.token": otpCode,
        });

        if (!token) throw new ErrorResponse("Invalid / expired token", 400);

        if (otpCode !== token.token || new Date(token.expire) > new Date(Date.now())) {
            throw new ErrorResponse("Invalid / expired token here", 400);
        }

        token.verifyPhone = undefined;
        await token.save();

        await User.findByAndUpdate(user.id, {
            phoneVerified: true,
        });
    },

    /**
     * @param {string | number} id logged in user's id
     * @param {*} updates current password, new password
     */
    async updatePassword(id, updates = {}) {
        const { currentPassword, newPassword } = updates;

        const user = await User.findById(id).select(
            "+password +resetPasswordExpire +resetPasswordToken "
            + "+otpCode +otpCodeExpire +loginToken +loginTokenExpire",
        );

        if (!user) throw new ErrorResponse("User not found", 404);

        const isValidPassword = await user.isValidPassword(currentPassword);

        if (!isValidPassword) throw new ErrorResponse("Current password is invalid", 400);

        user.set({
            password: newPassword,
            resetPasswordToken: undefined,
            resetPasswordExpire: undefined,
            isPasswordReset: true,
        });

        await user.save();
    },

    /**
     * @param {string} email User's email address
     */
    async forgotPassword(email) {
        const user = await User.findOne({ email });

        if (!user) throw new ErrorResponse("User email provided does not exist", 404);

        const passResetToken = await user.generateToken("passwordReset");

        await emailQueue.dispatch(
            email,
            "Password Reset Instructions",
            {
                name: `${user.fName} ${user.lName}`,
                tokenURL: `${frontEnd.adminPasswordResetUrl}?token=${passResetToken}`,
            },
            "user_password_reset",
        );
    },

    /**
     * @param {string} resetToken reset token issued to user
     * @param {*} newPassword new password of user
     */
    async resetPassword(resetToken, newPassword) {
        const token = await Token.findOne({
            "passwordReset.token": crypto.createHash("SHA256").update(resetToken).digest("hex"),
        });

        if (!token) throw new ErrorResponse("Invalid / expired token", 400);

        const user = await User.findById(token.user);

        if (!user) throw new ErrorResponse("Invalid / expired token", 400);

        const isValidResetToken = await user.isValidToken("passwordReset", resetToken);

        if (!isValidResetToken) throw new ErrorResponse("Invalid / expired token here", 400);

        token.passwordReset = undefined;
        await token.save();

        user.password = newPassword;
        user.isPasswordReset = true;
        user.accountLock.active = false;
        user.accountLock.loginAttempts = 0;
        await user.save();
    },

    /**
     * @param {string} resetToken reset token issued to user
     * @param {*} newPassword new password of user
     */
    async verifyToken(token) {
        const privateKey = fs.readFileSync(path.join(path.resolve("./"), "jwt.key"));
        return jwt.verify(token, privateKey, { algorithms: ["RS256"] });
    },

    /**
     * @param {string} resetToken reset token issued to user
     * @param {*} newPassword new password of user
     */
    async logout(token, iat, exp) {
        await RevokedToken.create({ token, iat, exp });
    },
};
