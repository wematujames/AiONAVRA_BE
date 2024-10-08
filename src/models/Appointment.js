const mongoose = require("mongoose");

// const { permissionMethods } = require("./methods");
// const { permissionHooks } = require("./hooks");
// const { permissionStatics } = require("./statics");

const appointmentSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default() { return this._id; },
        },
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            trim: true,
            unique: true,
        },
        duration: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["confirmed", "pending", "canceled"],
            default: "pending",
        },
        visitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visitor",
        },
        employee: {
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
    },
    {
        // methods: permissionMethods,
        // statics: permissionStatics,
        timestamps: true,
    },
);
// Add slug to permission
// permissionSchema.pre("save", permissionHooks.genSlug);
//
// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Appointment", appointmentSchema);
