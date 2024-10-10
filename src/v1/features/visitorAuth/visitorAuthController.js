const authService = require("./visitorAuthService");
const { asyncHandler } = require("../../middleware");
const { SuccessResponse } = require("../../utils");

module.exports = {

    // @desc            //login user
    // @route           //POST /api/auth/login
    // @access          //Public
    login: asyncHandler(async (req, res, next) => {
        const data = await authService.login(req.body.phone);

        return res.json(new SuccessResponse("Success", data));
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
    login2fa: asyncHandler(async (req, res, next) => {
        const data = await authService.login2fa(req.body.phone, req.body.otpCode);

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
    verifyOtp: asyncHandler(async (req, res, next) => {
        await authService.verifyPhone(req.body.otpCode, req.user);

        return res.json(new SuccessResponse("Phone Verified"));
    }),

    // @desc            //Update user details
    // @route           //POST /api/auth/user
    // @access          //Private
    savePushToken: asyncHandler(async (req, res, next) => {
        await authService.savePushtoken(req.body.token, req.user);

        return res.json(new SuccessResponse("Push token saved!"));
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
