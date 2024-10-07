const mongoose = require("mongoose");

const merchantConfigSchema = new mongoose.Schema(
    {
        collectionc2b: {
            allowed: {
                type: Boolean,
                default: true,
            },
            limit: {
                type: Number,
                default: 5000,
            },
        },
        directDebit: {
            allowed: {
                type: Boolean,
                default: false,
            },
            limit: {
                type: Number,
                default: 5000,
            },
        },
        disbursement: {
            allowed: {
                type: Boolean,
                default: false,
            },
            limit: {
                type: Number,
                default: 5,
            },
        },
        webTxns: {
            allowed: {
                type: Boolean,
                default: false,
            },
        },
        statusCheck: {
            allowed: {
                type: Boolean,
                default: true,
            },
        },
        reversal: {
            allowed: {
                type: Boolean,
                default: false,
            },
        },
        makeDDPayment: {
            allowed: {
                type: Boolean,
                default: true,
            },
        },
        updateDDAmount: {
            allowed: {
                type: Boolean,
                default: true,
            },
        },
        cancelDirectDebit: {
            allowed: {
                type: Boolean,
                default: true,
            },
        },
        channels: {
            mtn: {
                allowed: {
                    type: Boolean,
                    default: true,
                },
                processor: {
                    type: String,
                    enum: ["MTN-MoMo"],
                    default: "MTN-MoMo",
                },
            },
            telecel: {
                allowed: {
                    type: Boolean,
                    default: true,
                },
                processor: {
                    type: String,
                    enum: ["T-Cash"],
                    default: "T-Cash",
                },
            },
            airtelTigo: {
                allowed: {
                    type: Boolean,
                    default: true,
                },
                processor: {
                    type: String,
                    enum: ["AT-Cash"],
                    default: "AT-Cash",
                },
            },
        },
        api: {
            collectionc2bCb: {
                type: String,
                default: "",
            },
            disbursementCb: {
                type: String,
                default: "",
            },
            reversalCb: {
                type: String,
                default: "",
            },
            createDDebitCb: {
                type: String,
                default: "",
            },
            payDDebitCb: {
                type: String,
                default: "",
            },
            updateDDebitAmtCb: {
                type: String,
                default: "",
            },
            cancelDDebitAmtCb: {
                type: String,
                default: "",
            },
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
module.exports = new mongoose.model("MerchantConfig", merchantConfigSchema);
