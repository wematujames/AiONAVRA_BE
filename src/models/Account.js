const mongoose = require("mongoose");

const { accountMethods } = require("./methods");
const { accountStatics } = require("./statics");

const accountSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default() { return this._id; },
        },
        balance: {
            type: Number,
            default: 0.00,
            set: (val) => Math.round(val * 100) / 100,
            get: (val) => (val ? val.toFixed(2) : val),
        },
        collected: {
            type: Number,
            default: 0.00,
            set: (val) => Math.round(val * 100) / 100,
            get: (val) => (val ? val.toFixed(2) : val),
        },
        disbursed: {
            type: Number,
            default: 0.00,
            set: (val) => Math.round(val * 100) / 100,
            get: (val) => (val ? val.toFixed(2) : val),
        },
        reversed: {
            type: Number,
            default: 0.00,
            set: (val) => Math.round(val * 100) / 100,
            get: (val) => (val ? val.toFixed(2) : val),
        },

        merchant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Merchant",
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
        methods: accountMethods,
        statics: accountStatics,
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    },
);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("MerchantAccount", accountSchema);
