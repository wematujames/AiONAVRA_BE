const { checkSchema } = require("express-validator");

module.exports = {
    create: checkSchema({
        title: {
            trim: true,
            notEmpty: { bail: true },
        },
        content: {
            trim: true,
            notEmpty: { bail: true },
        },
        priority: {
            trim: true,
            isString: { bail: true },
            default: "General",
        },
        attachments: {
            default: [],
            isArray: true,
        },
        createdBy: {
            optional: true,
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
        content: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
        },
        priority: {
            optional: true,
            trim: true,
            isString: { bail: true },
            default: "General",
        },
        attachments: {
            optional: true,
            default: [],
            isArray: { bail: true },
        },
        createdBy: {
            optional: true,
            isMongoId: { bail: true },
        },
    }),
};
