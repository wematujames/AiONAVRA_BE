const mongoose = require("mongoose");

const revokedTokenSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default() { return this._id; },
    },
    token: {
        type: String,
    },
    iat: {
        type: Date,
    },
    exp: {
        type: Date,
    },
}, { timestamps: true });

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("RevokedToken", revokedTokenSchema);
