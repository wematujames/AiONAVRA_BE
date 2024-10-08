const mongoose = require("mongoose");
// const { merchantMethods } = require("./methods");
// const { merchantHooks } = require("./hooks");
// const { merchantStatics } = require("./statics");

const noticeSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default() { return this._id; },
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },
        priority: {
            type: String,
            trim: true,
            default: "General",
        },
        attachments: {
            type: [String],
            default: [],
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
        // methods: merchantMethods,
        // statics: merchantStatics,
        timestamps: true,
    },
);

// noticeSchema.pre("save", merchantHooks.preSaveActions);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Notice", noticeSchema);
