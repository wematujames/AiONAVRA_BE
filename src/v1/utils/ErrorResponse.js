class ErrorResponse extends Error {
    constructor(msg = "Server Error", statusCode = 500) {
        super(msg);
        this.statusCode = statusCode;
        this.success = false;
    }
}

module.exports = ErrorResponse;
