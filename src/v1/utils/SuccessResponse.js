class SuccessResponse {
    constructor(msg, data, meta) {
        this.success = true;
        this.message = msg || "Success";
        if (meta) this.meta = meta;
        if (data) this.data = data;
    }
}

module.exports = SuccessResponse;
