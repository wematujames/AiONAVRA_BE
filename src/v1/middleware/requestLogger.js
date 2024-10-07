const winston = require("winston");
const expressWinston = require("express-winston");
require("winston-daily-rotate-file");

// Define transports for logging
const transportsArray = [
    new winston.transports.DailyRotateFile({
        dirname: "logs",
        filename: "app_req_res-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "25m",
        maxFiles: "90d",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
    }),
];

// Add console logging for local or development environments
if (["local", "development"].includes(process.env.NODE_ENV)) {
    transportsArray.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`),
            ),
        }),
    );
}

// Create the request logger
const logger = expressWinston.logger({
    meta: true,
    expressFormat: true,
    colorize: false,
    ignoreRoute: (req, res) => false,
    headerBlacklist: ["Authorization", "x-merchant-secret"],
    bodyBlacklist: ["password", "currentPasssword", "newPassword", "oldPassword"],
    dynamicMeta: (req, res) => {
        const httpRequest = {
            requestMethod: req.method,
            requestUrl: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
            protocol: `HTTP/${req.httpVersion}`,
            remoteIp: req.ip,
            requestSize: req.socket.bytesRead,
            userAgent: req.get("User-Agent"),
            referrer: req.get("Referrer") || req.get("Referer"),
        };

        const response = {
            statusCode: res.statusCode,
            contentLength: res.get("Content-Length") || 0,
        };

        const meta = {
            httpRequest,
            response,
            responseTime: res.responseTime || null,
        };

        if (req.user) {
            meta.user = {
                id: req.user.id,
                email: req.user.email,
            };
        }

        if (req.merchant) {
            meta.merchant = {
                id: req.merchant.id,
                email: req.merchant.email,
            };
        }

        return meta;
    },
    transports: transportsArray,
});

module.exports = logger;
