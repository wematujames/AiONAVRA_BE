const mongoose = require("mongoose");
const { personMethods } = require("./methods");
const { personStatics } = require("./statics");

const routesSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default() { return this._id; },
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        eta: {
            type: String,
            trim: true,
            required: true,
        },
        floor: {
            type: String,
            trim: true,
            required: true,
        },
        elevation: {
            type: String,
            trim: true,
            required: true,
        },
        directions: {
            type: String,
            trim: true,
            required: true,
        },
        occupant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        methods: personMethods,
        statics: personStatics,
        timestamps: true,
    },
);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Route", routesSchema);
