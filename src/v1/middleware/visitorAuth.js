const asyncHandler = require("./asyncHandler");
const { ErrorResponse } = require("../utils");
const visitorAuthService = require("../features/visitorAuth/visitorAuthService");
const revokedTokenService = require("../features/auth/revokedTokenService");

module.exports = {
    protect: asyncHandler(async (req, res, next) => {
        let token;

        if (req.headers?.authorization?.startsWith("Bearer")) {
            const auth = req.headers?.authorization;
            token = auth?.split(" ")[1];
        }

        if (!token) return next(new ErrorResponse("Not authorized", 401));

        const isRevoked = await revokedTokenService.findOne({ token });

        if (isRevoked) return next(new ErrorResponse("Not authorized", 401));

        try {
            const decoded = await visitorAuthService.verifyToken(token);

            if (!decoded.id) {
                return next(new ErrorResponse("Unable to identify merchant", 400));
            }

            if (decoded.type !== "Visitor") {
                return next(new ErrorResponse("Invalid token provided", 403));
            }

            const user = await visitorAuthService.findById(decoded.id);

            if (!user) return next(new ErrorResponse("Not authorized", 401));

            req.user = user;

            return next();
        } catch (e) {
            return next(new ErrorResponse("Not authorized", 401));
        }
    }),

};
