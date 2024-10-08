const router = require("express").Router();
const visitorController = require("./visitorController");
const { auth } = require("../../middleware");
const userValidator = require("./visitorValidator");
const validator = require("../common/validate");
const generalValidator = require("../common/generalValidations");

router
    .route("/")
    .get(
        auth.protect,
        // auth.authorize,
        visitorController.advancedResult,
    )
    .post(
        auth.protect,
        // auth.authorize,
        validator.validate(userValidator.create),
        visitorController.create,
    );

router
    .route("/:id")
    .get(
        auth.protect,
        // auth.authorize,
        validator.validate(generalValidator.requireId),
        visitorController.findById,
    )
    .put(
        auth.protect,
        // auth.authorize,
        validator.validate(userValidator.update),
        visitorController.updateById,
    );

module.exports = router;
