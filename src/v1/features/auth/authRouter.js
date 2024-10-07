const router = require("express").Router();
const { auth } = require("../../middleware");
const authController = require("./authController");
const authValidator = require("./authValidator");
const validator = require("../common/validate");

router.post(
    "/login",
    validator.validate(authValidator.login),
    authController.login,
);
router.post(
    "/login2fa",
    validator.validate(authValidator.login2fa),
    authController.login2fa,
);
router.get(
    "/logout",
    authController.logout,
);
router.post(
    "/forgotpassword",
    validator.validate(authValidator.forgotPassword),
    authController.forgotPassword,
);
router.post(
    "/resetpassword",
    validator.validate(authValidator.resetPassword),
    authController.resetPassword,
);

router.get(
    "/genqrcode",
    auth.protect,
    authController.genAuthQrImage,
);
router.post(
    "/enablemultifa",
    auth.protect,
    validator.validate(authValidator.enable2fa),
    authController.enable2FACode,
);
router.get(
    "/user",
    auth.protect,
    authController.getUser,
);
router.put(
    "/user/updatedetails",
    auth.protect,
    validator.validate(authValidator.updateUserProfile),
    authController.updateDetails,
);
router.put(
    "/user/updateemail",
    auth.protect,
    validator.validate(authValidator.updateUserEmail),
    authController.updateEmail,
);
router.put(
    "/user/verifyemail",
    validator.validate(authValidator.verifyEmail),
    authController.verifyEmail,
);

router.put(
    "/user/updatemobile",
    auth.protect,
    validator.validate(authValidator.updateUserMobile),
    authController.updateMobile,
);
router.put(
    "/user/verifymobile",
    auth.protect,
    validator.validate(authValidator.verifyPhone),
    authController.verifyPhone,
);
router.put(
    "/user/updatepassword",
    auth.protect,
    validator.validate(authValidator.updatePassword),
    authController.updatePassword,
);

module.exports = router;
