const mongoose = require("mongoose");

const { permissionMethods } = require("./methods");
const { permissionHooks } = require("./hooks");
const { permissionStatics } = require("./statics");

const permissionSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default() { return this._id; },
        },
        name: {
            type: String,
            required: [true, "Permission name is required"],
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            immutable: true,
        },
        description: {
            type: String,
            trim: true,
            unique: true,
        },
        routes: {
            type: [String],
            required: true,
            immutable: true,
        },
        method: {
            type: String,
            immutable: true,
            enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
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
        methods: permissionMethods,
        statics: permissionStatics,
        timestamps: true,
    },
);
// Add slug to permission
permissionSchema.pre("save", permissionHooks.genSlug);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Permission", permissionSchema);
