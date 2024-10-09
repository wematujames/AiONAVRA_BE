const router = require("express").Router();
const feedbackController = require("./feedbackController");
const { auth } = require("../../middleware");
const feedbackValidator = require("./feedbackValidator");
const validator = require("../common/validate");
const generalValidator = require("../common/generalValidations");

router
    .route("/")
    .get(
        auth.protect,
        feedbackController.advancedResult,
    )
    .post(
        auth.protect,
        validator.validate(feedbackValidator.create),
        feedbackController.create,
    );

router
    .route("/:id")
    .get(
        auth.protect,
        validator.validate(generalValidator.requireId),
        feedbackController.findById,
    )
    .put(
        auth.protect,
        validator.validate(feedbackValidator.update),
        feedbackController.updateById,
    );

module.exports = router;
