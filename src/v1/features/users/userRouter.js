const router = require("express").Router();
const usersController = require("./userController");
const { auth } = require("../../middleware");
const userValidator = require("./userValidator");
const validator = require("../common/validate");
const generalValidator = require("../common/generalValidations");

router
    .route("/")
    .get(
        auth.protect,
        auth.authorize,
        usersController.advancedResult,
    )
    .post(
        auth.protect,
        auth.authorize,
        validator.validate(userValidator.create),
        usersController.create,
    );

router
    .route("/:id")
    .get(
        auth.protect,
        auth.authorize,
        validator.validate(generalValidator.requireId),
        usersController.findById,
    )
    .put(
        auth.protect,
        auth.authorize,
        validator.validate(userValidator.update),
        usersController.updateById,
    );

module.exports = router;
