const { checkSchema } = require("express-validator");

module.exports = {
    create: checkSchema({
        rating: {
            trim: true,
            isNumeric: { bail: true },
            isInt: { options: { min: 1, max: 5 }, bail: true },
        },
        title: {
            optional: true,
            trim: true,
            isString: { bail: true, options: {} },
        },
        description: {
            optional: true,
            trim: true,
            isString: { bail: true },
        },
        user: {
            optional: true,
            isMongoId: { bail: true },
        },
        visitor: {
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
        rating: {
            optional: true,
            trim: true,
            isNumeric: { bail: true },
            isInt: { options: { min: 1, max: 5 }, bail: true },
        },
        title: {
            optional: true,
            trim: true,
            isString: { bail: true, options: {} },
        },
        description: {
            optional: true,
            trim: true,
            isString: { bail: true },
        },
    }),
};
