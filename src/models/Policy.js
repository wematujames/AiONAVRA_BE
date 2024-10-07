const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
    {
        password: {
            enabled: {
                type: Boolean,
                default: false,
            },
            conditions: {
                length: {
                    present: {
                        type: Boolean,
                        default: true,
                    },
                    count: {
                        type: Number,
                        default: 12,
                    },
                },
                specialChars: {
                    present: {
                        type: Boolean,
                        default: true,
                    },
                    count: {
                        type: Number,
                        default: 2,
                    },
                },
                upperCaseChars: {
                    present: {
                        type: Boolean,
                        default: true,
                    },
                    count: {
                        type: Number,
                        default: 2,
                    },
                },
                lowerCaseChars: {
                    present: {
                        type: Boolean,
                        default: true,
                    },
                    count: {
                        type: Number,
                        default: 5,
                    },
                },
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Policies", policySchema);
