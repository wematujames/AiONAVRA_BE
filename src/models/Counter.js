const mongoose = require("mongoose");
const { counterStatics } = require("./statics");

const counterSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default() { return this._id; },
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    sequence: {
        type: Number,
        default: 100000,
    },
    prefix: {
        type: String,
        default: "",
    },
    createdBy: {
        type: String,
        default: "System",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedBy: {
        type: String,
        default: "System",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { statics: counterStatics, timestamps: true });

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("counter", counterSchema);
