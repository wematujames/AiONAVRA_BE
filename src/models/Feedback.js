const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default() { return this._id; },
    },
    rating: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
module.exports = new mongoose.model("Feedback", feedbackSchema);
