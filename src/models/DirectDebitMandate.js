const mongoose = require("mongoose");
const moment = require("moment");

const mandateSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default() { return this._id; },
    },
    ref: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: [true, "Mandate phone/msisdn is required"],
    },
    amount: {
        type: Number,
        required: [true, "Direct Debit amount is required"],
    },
    desc: {
        type: String,
        trim: true,
        required: [true, "Description for mandate is required"],
    },
    network: {
        type: String,
        enum: ["MTN", "Telecel", "AirtelTigo"],
        required: true,
    },
    agreeTnC: {
        type: String,
        required: true,
        enum: ["1", "0"],
    },
    active: {
        type: Boolean,
        default: false,
    },
    statusReason: {
        type: String,
        default: "pending",
    },
    processor: {
        type: String,
        required: false,
        enum: ["T-Cash", "MTN-Direct"],
    },

    /* Direct Debit Critical fields */
    frequency: {
        type: String,
        required: true,
    },
    firstPaymentDate: {
        type: Date,
        required: true,
        default: moment(
            new Date().toISOString().split("T")[0],
        ).toISOString(),
    },
    nextPaymentDate: {
        type: Date,
        default() {
            return this.firstPaymentDate;
        },
    },
    expiryDate: {
        type: Date,
        required: false,
    },
    isExpired: {
        type: Boolean,
        default: false,
    },

    /* Processor mandate auth / credentials */
    processorInitialRef: {
        type: String,
        required: false,
    },
    processorTerminalRef: {
        type: String,
        required: false,
    },
    processorMandateId: {
        type: String,
        required: false,
    },
    processorMandateToken: {
        type: String,
        required: false,
    },

    /* Processor cancel mandate references */
    cancelMandateRef: {
        type: String,
        required: false,
    },
    processorCancelMandateInitialRef: {
        type: String,
        required: false,
    },
    processorCancelMandateTerminalRef: {
        type: String,
        required: false,
    },

    /* Third party merchant transaction info fields */
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Merchant",
        required: false,
    },
    merchantRef: {
        type: String,
        required: [true, "Ext party reference is required"],
    },
    merchantCreateDDMCallbackURL: {
        type: String,
        required: true,
    },
    merchantPayDDMCallbackURL: {
        type: String,
        required: true,
    },
    merchantCancelCallbackURL: {
        type: String,
        required: false,
    },

    /* Store full terminal response from processor */
    extTransactionResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtTransaction",
        required: false,
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
}, { timestamps: true });

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("DirectDebitMandate", mandateSchema);
