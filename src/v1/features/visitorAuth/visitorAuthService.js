const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const smsQueue = require("../../queues/smsQueue");
const { ErrorResponse } = require("../../utils");
const baseService = require("../common/baseService");
const { Visitor, RevokedToken, Token } = require("../../../models");

module.exports = {
    ...baseService(Visitor),

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async login(phone) {
        let isNew = false;

        let visitor = await Visitor.findOne({ phone });

        if (!visitor) {
            visitor = await Visitor.create({ phone });

            const tokens = await Token.create({ visitor: visitor.id });

            visitor.tokens = tokens.id;
            await visitor.save();

            isNew = true;
        }

        const otpCode = await visitor.genOTP();

        this.dispatchOtp(visitor.phone, otpCode);

        return { isNew };
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async login2fa(phone, otpCode) {
        const visitor = await Visitor.findOne({ phone, "otpCode.code": otpCode });

        if (!visitor) throw new ErrorResponse("Invalid/expired login token", 400);

        const isValidOtp = await visitor.isValidOTP(otpCode);

        if (!isValidOtp) throw new ErrorResponse("Expired/invalid login token", 400);

        const jwToken = await visitor.getSignedJwtToken({ type: "Visitor" });

        visitor["otpCode.code"] = undefined;
        visitor["otpCode.expires"] = undefined;
        await visitor.save();

        return { token: jwToken };
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async requestOTP(data) {
        const { phone } = data;

        const visitor = await Visitor.findOne({ phone });

        if (!visitor) throw new ErrorResponse("Visitor not found", 400);

        const otpCode = await visitor.genOTP();

        return this.dispatchOtp(visitor.phone, otpCode);
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async savePushtoken(token, visitor) {
        await Token.updateOne({ _id: visitor.tokens }, { pushToken: token });
    },

    /**
     * @param {object} data Login email and password
     * @returns {object} token, cookieOptions and success login succes msg
     */
    async dispatchOtp(phone, otpCode) {
        await smsQueue.dispatch({
            to: phone,
            message: `Your OTP code is: ${otpCode}. Expires in 5 minutes.`,
        });
    },

    /**
     * @param {string | number} id logged Visitor's id
     * @param {*} updates Visitor fields to update
     */
    async updateVisitorDetails(id, data = {}) {
        const visitor = await Visitor.findById(id).select("+password");

        if (!visitor) throw new ErrorResponse("Visitor not found", 404);

        visitor.set(data);

        return visitor.save;
    },

    /**
     * @param {string} resetToken reset token issued to Visitor
     * @param {*} newPassword new password of Visitor
     */
    async verifyToken(token) {
        const privateKey = fs.readFileSync(path.join(path.resolve("./"), "jwt.key"));
        return jwt.verify(token, privateKey, { algorithms: ["RS256"] });
    },

    /**
     * @param {string} resetToken reset token issued to Visitor
     * @param {*} newPassword new password of Visitor
     */
    async logout(token, iat, exp) {
        await RevokedToken.create({ token, iat, exp });
    },
};
