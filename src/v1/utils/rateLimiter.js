const rateLimiter = require("express-rate-limit");

module.exports = rateLimiter({
    windowMs: 20 * 60 * 1000, // 10 minutes
    max: 50, // 50 requests per IP
});
