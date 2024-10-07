const mongoose = require("mongoose");
const { userMethods } = require("./methods");
const { userHooks } = require("./hooks");
const { userStatics } = require("./statics");

const userSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default() { return this._id; },
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
        password: {
            type: String,
            trim: true,
            required: true,
            select: false,
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
        active: {
            type: Boolean,
            default: true,
        },
        tokens: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token",
        },
        permissions: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Permission",
            default: [],
        },
        person: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
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
        methods: userMethods,
        statics: userStatics,
        timestamps: true,
    },
);

userSchema.pre("save", userHooks.preSaveActions);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("User", userSchema);
