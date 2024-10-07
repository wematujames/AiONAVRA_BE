const { authService } = require("./authService");
const { asyncHandler } = require("../../middleware");
const { SuccessResponse } = require("../../utils");

module.exports = {
    // @desc            //Register user
    // @route           //POST /api/auth/register
    // @access          //Public
    genAuthQrImage: asyncHandler(async (req, res, next) => {
        const qrImage = await authService.generateQrImage(req.user);

        res.json(new SuccessResponse("Registration successful", qrImage));
    }),

    // @desc            //Register user
    // @route           //POST /api/auth/register
    // @access          //Public
    enable2FACode: asyncHandler(async (req, res, next) => {
        const multiFAEnabled = await authService.enable2FACode(req.user, req.body.verficationCode);

        res.status(201).json(new SuccessResponse("2FA enabled successfully", multiFAEnabled));
    }),

    // @desc            //login user
    // @route           //POST /api/auth/login
    // @access          //Public
    getOTP: asyncHandler(async (req, res, next) => {
        const token = await authService.requestOTP(req.body);

        return res.json(new SuccessResponse("Success", { loginToken: token }));
    }),

    // @desc            //login user
    // @route           //POST /api/auth/login
    // @access          //Public
    login: asyncHandler(async (req, res, next) => {
        const data = await authService.login(req.body);

        return res.json(new SuccessResponse("Success", data));
    }),

    // @desc            //login user
    // @route           //POST /api/auth/login
    // @access          //Public
    login2fa: asyncHandler(async (req, res, next) => {
        const data = await authService.login2fa(req.body);

        return res.json(new SuccessResponse("Logged In", data));
    }),

    // @desc            //Get logged in user
    // @route           //GET /api/auth/user
    // @access          //Private
    getUser: asyncHandler(async (req, res, next) => {
        // eslint-disable-next-line no-underscore-dangle
        const user = req.user._doc;

        user.multiFAEnabled = req.user.multiFA?.enabled;
        user.multiFA = undefined;

        res.json(new SuccessResponse("Success", user));
    }),

    // @desc            //Update user details
    // @route           //POST /api/auth/user
    // @access          //Private
    updateDetails: asyncHandler(async (req, res, next) => {
        await authService.updateUserDetails(req.user.id, req.body);

        return res.json(new SuccessResponse("Successfully updated user details"));
    }),

    // @desc            //Update user details
    // @route           //POST /api/auth/user
    // @access          //Private
    updateEmail: asyncHandler(async (req, res, next) => {
        await authService.updateEmail(req.user.id, req.body);

        return res.json(new SuccessResponse("Successfully updated user email"));
    }),

    // @desc            //Update user details
    // @route           //POST /api/auth/user
    // @access          //Private
    verifyEmail: asyncHandler(async (req, res, next) => {
        await authService.verifyEmail(req.body.token);

        return res.json(new SuccessResponse("Email Verified"));
    }),

    // @desc            //Update user details
    // @route           //POST /api/auth/user
    // @access          //Private
    updateMobile: asyncHandler(async (req, res, next) => {
        await authService.updateUserMobile(req.user.id, req.body);

        return res.json(new SuccessResponse("Successfully updated user mobile"));
    }),

    // @desc            //Update user details
    // @route           //POST /api/auth/user
    // @access          //Private
    verifyPhone: asyncHandler(async (req, res, next) => {
        await authService.verifyPhone(req.body.otpCode, req.user);

        return res.json(new SuccessResponse("Phone Verified"));
    }),

    // @desc            //Update user password
    // @route           //POST /api/auth/user/updatepassword
    // @access          //Private
    updatePassword: asyncHandler(async (req, res, next) => {
        const { currentPassword, newPassword } = req.body;

        await authService.updatePassword(req.user.id, { currentPassword, newPassword });

        return res.json(new SuccessResponse("Successfully updated password"));
    }),

    // @desc            //User forgot password
    // @route           //POST /api/auth/user/forgotpassword
    // @access          //Public
    forgotPassword: asyncHandler(async (req, res, next) => {
        await authService.forgotPassword(req.body.email);

        return res.json(new SuccessResponse("Password reset instructions sent to your email account"));
    }),

    // @desc            //User reset password
    // @route           //POST /api/auth/user/resetpassword
    // @access          //Public
    resetPassword: asyncHandler(async (req, res, next) => {
        await authService.resetPassword(req.body.resetToken, req.body.newPassword);

        res.json(new SuccessResponse("Password reset success"));
    }),

    // @desc            //Log user out
    // @route           //POST /api/auth/logout
    // @access          //Private
    logout: asyncHandler(async (req, res, next) => {
        const authToken = req.headers?.authorization.split(" ")[1];

        const decoded = await authService.verifyToken(authToken);

        await authService.logout(authToken, decoded.iat, decoded.exp);

        res.json(new SuccessResponse("Logout success"));
    }),
};
