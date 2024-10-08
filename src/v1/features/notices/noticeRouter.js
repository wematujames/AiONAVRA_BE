const router = require("express").Router();
const noticeController = require("./noticeController");
const { auth } = require("../../middleware");
const noticeValidator = require("./noticeValidator");
const validator = require("../common/validate");
const generalValidator = require("../common/generalValidations");

router
    .route("/")
    .get(
        auth.protect,
        // auth.authorize,
        noticeController.advancedResult,
    )
    .post(
        auth.protect,
        // auth.authorize,
        validator.validate(noticeValidator.create),
        noticeController.create,
    );

router
    .route("/:id")
    .get(
        auth.protect,
        // auth.authorize,
        validator.validate(generalValidator.requireId),
        noticeController.findById,
    )
    .put(
        auth.protect,
        // auth.authorize,
        validator.validate(noticeValidator.update),
        noticeController.updateById,
    );

module.exports = router;
