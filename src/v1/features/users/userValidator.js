const { checkSchema } = require("express-validator");

module.exports = {
    create: checkSchema({
        title: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
            isAlpha: { bail: true },
        },
        fName: {
            trim: true,
            notEmpty: { bail: true },
        },
        lName: {
            trim: true,
            notEmpty: { bail: true },
        },
        active: {
            default: true,
            toBoolean: true,
            isBoolean: { bail: true },
        },
        email: {
            trim: true,
            isEmail: { bail: true },
        },
        userType: {
            default: "Employee",
            isIn: { options: [["Admin", "Employee"]], bail: true },
        },
        employeeId: {
            optional: true,
            notEmpty: { bail: true },
        },
        phone: {
            trim: true,
            customSanitizer: {
                options: (_value) => {
                    const value = _value.replace(/\D/g, "");

                    if (value.startsWith("0")) return `233${value.slice(1)}`;

                    if (!value.startsWith("233")) return `233${value}`;

                    return value;
                },
            },
            isNumeric: { bail: true },
            errorMessage: "Mobile is required and must be valid",
        },
        createdBy: {
            isMongoId: { bail: true },
        },
    }),

    update: checkSchema({
        id: {
            in: ["params"],
            trim: true,
            isMongoId: { bail: true },
        },
        title: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
            isAlpha: { bail: true },
        },
        fName: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
            isAlpha: { bail: true },
        },
        lName: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
            isAlpha: { bail: true },
        },
        email: {
            optional: true,
            trim: true,
            isEmail: { bail: true },
        },
        active: {
            optional: true,
            isBoolean: { bail: true },
        },
        userType: {
            optional: true,
            isBoolean: { bail: true },
        },
        employeeId: {
            optional: true,
            isBoolean: { bail: true },
        },
        phone: {
            optional: true,
            trim: true,
            isMobilePhone: { bail: true },
            customSanitizer: {
                options: (_value) => {
                    const value = _value.replace(/\D/g, "");

                    if (value.startsWith("0")) return `233${value.slice(1)}`;

                    if (!value.startsWith("233")) return `233${value}`;

                    return value;
                },
            },
            errorMessage: "Mobile is required and must be valid",
        },
    }),
};
