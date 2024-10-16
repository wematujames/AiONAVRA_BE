const router = require("express").Router();
const appointmentController = require("./appointmentController");
const { auth } = require("../../middleware");
const appointmentValidator = require("./appointmentValidator");
const validator = require("../common/validate");
const generalValidator = require("../common/generalValidations");

router
    .route("/")
    .get(
        auth.protect,
        // auth.authorize,
        appointmentController.advancedResult,
    )
    .post(
        auth.protect,
        // auth.authorize,
        validator.validate(appointmentValidator.create),
        appointmentController.create,
    );

router.put(
    "/employee/approval/:id",
    auth.protect,
    // auth.authorize,
    validator.validate(appointmentValidator.update),
    appointmentController.employeeSetAppointmentStatus,
);

router
    .route("/:id")
    .get(
        auth.protect,
        // auth.authorize,
        validator.validate(generalValidator.requireId),
        appointmentController.findById,
    ).put(
        auth.protect,
        // auth.authorize,
        validator.validate(appointmentValidator.update),
        appointmentController.updateById,
    );

module.exports = router;
