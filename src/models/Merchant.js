const mongoose = require("mongoose");
const { merchantMethods } = require("./methods");
const { merchantHooks } = require("./hooks");
const { merchantStatics } = require("./statics");

const merchantSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default() { return this._id; },
        },
        merchantId: {
            type: String,
            required: true,
            unique: true,
        },
        merchantSecret: {
            type: String,
            trim: true,
            required: true,
            select: false,
        },
        name: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        oldEmails: {
            type: [String],
            default: [],
            select: false,
        },
        password: {
            type: String,
            trim: true,
            required: true,
            select: false,
        },
        phone: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        phoneVerified: {
            type: Boolean,
            default: false,
        },
        oldPhones: {
            type: [String],
            default: [],
            select: false,
        },
        accountLock: {
            active: {
                type: Boolean,
                default: false,
            },
            loginAttempts: {
                type: Number,
                default: 0,
            },
        },
        multiFA: {
            type: {
                enabled: {
                    type: Boolean,
                    default: false,
                },
                secret: {
                    type: String,
                    default: "N/A",
                },
                tempSecret: {
                    type: String,
                    default: "N/A",
                },
                backupCodes: {
                    type: [String],
                    default: [],
                },
            },
        },
        otpCode: {
            type: String,
            trim: true,
            select: false,
        },
        otpCodeExpire: {
            type: Date,
            select: false,
        },
        loginToken: {
            type: String,
            trim: true,
            select: false,
        },
        loginTokenExpire: {
            type: Date,
            select: false,
        },
        lastLogin: {
            type: Date,
            required: false,
        },
        isPasswordReset: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: {
            type: String,
            trim: true,
            select: false,
        },
        resetPasswordExpire: {
            type: Date,
            required: false,
            select: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        tokens: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token",
        },
        config: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MerchantConfig",
        },
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MerchantAccount",
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
        methods: merchantMethods,
        statics: merchantStatics,
        timestamps: true,
    },
);

merchantSchema.pre("save", merchantHooks.preSaveActions);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Merchant", merchantSchema);
