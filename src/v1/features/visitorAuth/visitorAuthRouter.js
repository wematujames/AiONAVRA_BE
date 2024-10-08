const router = require("express").Router();
const { visitorAuth } = require("../../middleware");
const visitorAuthController = require("./visitorAuthController");
const visitorAuthValidator = require("./visitorAuthValidator");
const validator = require("../common/validate");

router.post(
    "/visitorlogin",
    validator.validate(visitorAuthValidator.login),
    visitorAuthController.login,
);
router.post(
    "/visitorgetOtp",
    validator.validate(visitorAuthValidator.login),
    visitorAuthController.getOTP,
);
router.post(
    "/visitorlogin2fa",
    validator.validate(visitorAuthValidator.login2fa),
    visitorAuthController.login2fa,
);
router.get(
    "/logout",
    visitorAuthController.logout,
);
router.get(
    "/visitor",
    visitorAuth.protect,
    visitorAuthController.getUser,
);
router.put(
    "/visitor/updatedetails",
    visitorAuth.protect,
    validator.validate(visitorAuthValidator.updateUserProfile),
    visitorAuthController.updateDetails,
);
router.put(
    "/user/verifyotp",
    visitorAuth.protect,
    validator.validate(visitorAuthValidator.verifyPhone),
    visitorAuthController.verifyOtp,
);

module.exports = router;
