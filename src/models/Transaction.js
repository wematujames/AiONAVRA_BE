const mongoose = require("mongoose");
const { transactionStatics } = require("./statics");

const transactionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default() { return this._id; },
    },
    phone: {
        type: String,
        immutable: true,
        required: [true, "Payment phone/msisdn is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount for payment is required"],
    },
    originalAmount: {
        type: Number,
        immutable: true,
        default() { return this.amount; },
    },
    desc: {
        type: String,
        trim: true,
        immutable: true,
        required: [true, "Description for payment is required"],
    },
    type: {
        type: String,
        immutable: true,
        enum: ["collection", "collection-dd",
            "disbursement-b2c", "disbursement-b2b"],
        required: true,
    },
    ref: {
        type: String,
        trim: true,
        required: [false, "Reference for payment is required"],
    },
    network: {
        type: String,
        immutable: true,
        enum: ["MTN", "Telecel"],
        required: true,
    },
    processor: {
        type: String,
        required: false,
        enum: ["T-Cash", "MTN-MoMo"],
    },

    /* Payment result fields */
    code: {
        type: String,
        required: false,
        enum: ["000", "111"],
    },
    status: {
        type: String,
        enum: ["pending", "successful", "failed"],
        default: "pending",
    },
    statusReason: {
        type: String,
        default: "pending",
    },

    /* Processor transaction references */
    processorInitialRef: {
        type: String,
        required: false,
    },
    processorTerminalRef: {
        type: String,
        required: false,
    },

    /* Transaction reversal details  */
    reversed: {
        type: Boolean,
        default: false,
    },
    reversalStatus: {
        type: String,
        enum: ["pending", "successful", "failed"],
    },
    reversalAmount: {
        type: Number,
        required: false,
    },
    reversalRef: {
        type: String,
        required: false,
    },
    processorReversalInitialRef: {
        type: String,
        required: false,
    },
    processorReversalTerminalRef: {
        type: String,
        required: false,
    },

    /* Merchant references */
    merchantRef: {
        type: String,
        required: false,
    },
    merchantCallbackURL: {
        type: String,
        required: true,
    },
    merchantReversalCallbackURL: {
        type: String,
        required: false,
    },

    /* Direct Debit Mandate reference */
    mandate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DirectDebitMandate",
        immutable: true,
        required: false,
    },

    /* Transaction merchant details */
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Merchant",
        immutable: true,
        required: false,
    },

    /* Payment processor results */
    extTransactionResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtTransaction",
        required: false,
    },
    extReversalResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtTransaction",
        required: false,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        immuntable: true,
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
}, { timestamps: true, statics: transactionStatics });

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Transaction", transactionSchema);
