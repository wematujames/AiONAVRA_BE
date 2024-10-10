const router = require("express").Router();
const { visitorAuth } = require("../../middleware");
const visitorAuthController = require("./visitorAuthController");
const visitorAuthValidator = require("./visitorAuthValidator");
const validator = require("../common/validate");

router.post(
    "/login",
    validator.validate(visitorAuthValidator.login),
    visitorAuthController.login,
);
router.post(
    "/getOtp",
    validator.validate(visitorAuthValidator.login),
    visitorAuthController.getOTP,
);
router.post(
    "/login2fa",
    validator.validate(visitorAuthValidator.login2fa),
    visitorAuthController.login2fa,
);
router.get(
    "/logout",
    visitorAuthController.logout,
);
router.get(
    "/profile",
    visitorAuth.protect,
    visitorAuthController.getUser,
);
router.post(
    "/notifications/savepushtoken",
    visitorAuth.protect,
    visitorAuthController.savePushToken,
);
router.put(
    "/updatedetails",
    visitorAuth.protect,
    validator.validate(visitorAuthValidator.updateUserProfile),
    visitorAuthController.updateDetails,
);
router.put(
    "/verifyotp",
    visitorAuth.protect,
    validator.validate(visitorAuthValidator.verifyPhone),
    visitorAuthController.verifyOtp,
);

module.exports = router;
