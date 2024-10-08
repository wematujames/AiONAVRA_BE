const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default() { return this._id; },
    },
    fName: {
        type: String,
        trim: true,
        required: true,
    },
    lName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
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
    userType: {
        type: String,
        enum: ["Visitor"],
        default: "Visitor",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("User", userSchema);
