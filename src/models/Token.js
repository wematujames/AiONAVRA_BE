const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        login: {
            token: String,
            expire: Date,
        },
        txn: {
            token: String,
            expire: Date,
        },
        webTxn: {
            token: String,
        },
        verifyEmail: {
            token: String,
            expire: Date,
        },
        verifyPhone: {
            token: String,
            expire: Date,
        },
        passwordReset: {
            token: String,
            expire: Date,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
        timestamps: true,
    },
);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Token", userSchema);
