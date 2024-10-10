const mongoose = require("mongoose");
const { visitorMethods } = require("./methods");
const { visitorStatics } = require("./statics");

const visitorSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default() { return this._id; },
    },
    fName: {
        type: String,
        trim: true,
        default: "",
    },
    lName: {
        type: String,
        trim: true,
        default: "",
    },
    email: {
        type: String,
        trim: true,
        default: "",
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    otpCode: {
        type: {
            code: String,
            expires: Date,
        },
        default: {},
    },
    userType: {
        type: String,
        enum: ["Visitor"],
        default: "Visitor",
    },
    tokens: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Token",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    methods: visitorMethods,
    statics: visitorStatics,
    timestamps: true,
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Visitor", visitorSchema);
