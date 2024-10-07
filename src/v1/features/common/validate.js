const { validationResult } = require("express-validator");
const { logger } = require("../../utils");

function checkIfExtraFields(validators, req) {
    const allowedFields = validators.reduce(
        (fields, rule) => [...fields, ...rule.builder.fields],
        [],
    ).sort();

    // Check for all common request inputs
    const requestInput = {
        ...req.query,
        ...req.params,
        ...req.body,
    };

    const requestFields = Object.keys(requestInput).sort();

    // if (JSON.stringify(allowedFields) === JSON.stringify(requestFields)) {
    //     return false;
    // }

    const allRequestFieldsAllowed = requestFields.every((field) => allowedFields.includes(field));

    if (allRequestFieldsAllowed) return false;

    logger.error(`${req.ip} try to make a invalid request`);

    return true;
}

const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = {};

        errors.array().forEach((err) => {
            errorMessages[[err.param]] = err.msg;
        });

        return res.status(400).json({ errors: errorMessages });
    }

    // Ensure unknown fields are not added
    const extraFields = checkIfExtraFields(validations, req);

    if (extraFields) {
        return res.status(400).json({
            success: false,
            message: "Unknown field values provided. Please ensure only allowed fields are provided",
        });
    }

    return next();
};

module.exports = { validate };
