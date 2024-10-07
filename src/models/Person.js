const mongoose = require("mongoose");
const { personMethods } = require("./methods");
const { personStatics } = require("./statics");

const personSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default() { return this._id; },
        },
        title: {
            type: String,
            trim: true,
        },
        fName: {
            type: String,
            trim: true,
            required: true,
        },
        lName: {
            type: String,
            trim: true,
            required: true,
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
module.exports = new mongoose.model("Person", personSchema);
