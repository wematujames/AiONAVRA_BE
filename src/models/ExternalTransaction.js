const mongoose = require("mongoose");

const extTransactionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default() { return this._id; },
    },
    result: {
        type: Object,
        required: [true, "External payment result is required"],
    },
    transactionType: {
        type: String,
        immutable: true,
        enum: ["collection", "collection-dd", "reversal", "status-check",
            "create-mandate", "disbursement-b2c", "query-direct-debit-status",
            "cancel-mandate", "disbursement-b2b", "query-direct-debit-status"],
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
        required: false,
    },
    mandate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mandate",
        required: false,
    },
    createdBy: {
        type: String,
        default: "External Party",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedBy: {
        type: String,
        default: "External Party",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("ExtTransaction", extTransactionSchema);
