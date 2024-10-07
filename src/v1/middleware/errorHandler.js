const { logger, ErrorResponse } = require("../utils");

module.exports = (err, req, res, next) => {
    /* Log internal Server Errors */
    logger.error(err.message || "error", err.stack);

    /* Customize error message */
    let error = { ...err };
    error.message = err.message;

    /* Catch Duplicate key error (Resource already exists) */
    if (err.code === 11000) {
        error.statusCode = 400;
        error.message = "Resource already exists";
    }

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = "Resource not found";
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field values entered. Please ensure all required unique fields are so";
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server error",
    });
};
