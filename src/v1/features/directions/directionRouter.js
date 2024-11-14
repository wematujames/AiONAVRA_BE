const router = require("express").Router();
const directionController = require("./directionController");
const { auth } = require("../../middleware");
const directionValidator = require("./directionValidator");
const validator = require("../common/validate");
const generalValidator = require("../common/generalValidations");

router
    .route("/")
    .get(
        auth.protect,
        // auth.authorize,
        directionController.advancedResult,
    )
    .post(
        auth.protect,
        // auth.authorize,
        validator.validate(directionValidator.create),
        directionController.create,
    );

router
    .route("/sendroutetouser").post(
        auth.protect,
        // auth.authorize,
        validator.validate(directionValidator.sendRouteToUser),
        directionController.sendRouteToUser,
    );

router
    .route("/:id")
    .get(
        auth.protect,
        // auth.authorize,
        validator.validate(generalValidator.requireId),
        directionController.findById,
    )
    .put(
        auth.protect,
        // auth.authorize,
        validator.validate(directionValidator.update),
        directionController.updateById,
    );

module.exports = router;
