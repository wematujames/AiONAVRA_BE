const { checkSchema } = require("express-validator");

module.exports = {
    create: checkSchema({
        name: {
            trim: true,
            notEmpty: { bail: true },
        },
        description: {
            trim: true,
            notEmpty: { bail: true },
        },
        floor: {
            trim: true,
            isNumeric: { bail: true },
        },
        elevation: {
            trim: true,
            isIn: { options: [["Stairs", "Elevator", "None"]] },
        },
        eta: {
            trim: true,
            isNumeric: { bail: true },
        },
        occupant: {
            isMongoId: { bail: true },
        },
        directions: {
            trim: true,
            notEmpty: { bail: true },
        },
        createdBy: {
            isMongoId: { bail: true },
        },
    }),

    update: checkSchema({
        id: {
            in: ["params"],
            isMongoId: { bail: true },
            trim: true,
        },
        name: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
        },
        description: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
        },
        floor: {
            optional: true,
            trim: true,
            isNumeric: { bail: true },
        },
        elevation: {
            optional: true,
            trim: true,
            isIn: { options: [["Stairs", "Elevator", "None"]] },
        },
        eta: {
            optional: true,
            trim: true,
            isNumeric: { bail: true },
        },
        occupant: {
            optional: true,
            isMongoId: { bail: true },
        },
        directions: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
        },
        createdBy: {
            optional: true,
            isMongoId: { bail: true },
        },
    }),

    sendRouteToUser: checkSchema({
        routeId: {
            in: ["body"],
            trim: true,
            isMongoId: { bail: true },
        },
    }),
};
