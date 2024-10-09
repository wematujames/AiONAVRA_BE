const router = require("express").Router();
const { auth } = require("../../middleware");
const enquiriesController = require("./enquiryController");
const enquiryValidator = require("./enquiryValidator");
const validator = require("../common/validate");

router
    .route("/")
    .post(
        auth.protect,
        validator.validate(enquiryValidator.makeEnquiry),
        enquiriesController.makeEnquiry,
    );

module.exports = router;
