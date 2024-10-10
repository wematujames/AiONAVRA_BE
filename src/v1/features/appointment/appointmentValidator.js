const { checkSchema } = require("express-validator");

module.exports = {
    create: checkSchema({
        title: {
            trim: true,
            notEmpty: { bail: true },
        },
        description: {
            trim: true,
            notEmpty: { bail: true },
        },
        date: {
            trim: true,
            isString: { bail: true },
            notEmpty: { bail: true },
        },
        duration: {
            trim: true,
            isNumeric: { bail: true },
        },
        status: {
            trim: true,
            default: "pending",
            isIn: { options: ["pending"] },
        },
        employee: {
            trim: true,
            isMongoId: { bail: true },
        },
        visitor: {
            trim: true,
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
        },
        description: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
        },
        date: {
            optional: true,
            trim: true,
            isString: { bail: true },
            notEmpty: { bail: true },
        },
        duration: {
            optional: true,
            trim: true,
            isNumeric: { bail: true },
        },
        status: {
            optional: true,
            trim: true,
            default: "pending",
            isIn: { options: [["pending", "canceled", "confirmed"]] },
        },
        employee: {
            optional: true,
            trim: true,
            isMongoId: { bail: true },
        },
        visitor: {
            optional: true,
            trim: true,
            isMongoId: { bail: true },
        },
    }),
};
