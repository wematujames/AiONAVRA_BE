const os = require("os");
const winston = require("winston");
const path = require("path");

class Logger {
    constructor(serviceName) {
        this.hostname = os.hostname();
        this.serviceName = serviceName;

        const logDir = path.join(__dirname, "../../../logs");

        const logLevel = process.env.NODE_ENV === "production" ? "info" : "debug";

        this.logger = winston.createLogger({
            level: logLevel,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.metadata({
                    fillExcept: ["timestamp", "service", "level", "message"],
                }),
            ),
            defaultMeta: { service: this.serviceName },
            transports: [
                new winston.transports.File({
                    dirname: logDir,
                    filename: "error.log",
                    level: "error",
                    format: winston.format.combine(
                        winston.format.colorize(),
                        this.fileFormat(),
                    ),
                }),
                new winston.transports.File({
                    dirname: logDir,
                    filename: "combined.log",
                    tailable: true,
                    format: winston.format.combine(
                        winston.format.colorize(),
                        this.fileFormat(),
                    ),
                }),
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        this.consoleFormat(),
                    ),
                }),
            ],
        });
    }

    consoleFormat() {
        return winston.format.printf(
            ({
                timestamp, level, message, metadata,
            }) => {
                const metaString = Object.keys(metadata).length ? JSON.stringify(metadata) : "";
                return `[${timestamp}][${level}][${this.serviceName}@${this.hostname}] ${message} ${metaString}`;
            },
        );
    }

    fileFormat() {
        return winston.format.printf(
            ({
                timestamp, level, message, metadata,
            }) => {
                const metaString = Object.keys(metadata).length ? JSON.stringify(metadata) : "";
                return `[${timestamp}] [${level}] [${this.serviceName}@${this.hostname}] ${message} ${metaString}`;
            },
        );
    }

    log(level, message, metadata = {}) {
        this.logger.log(level, message, { metadata });
    }

    debug(message, metadata) {
        this.log("debug", message, metadata);
    }

    info(message, metadata) {
        this.log("info", message, metadata);
    }

    warn(message, metadata) {
        this.log("warn", message, metadata);
    }

    error(message, metadata) {
        this.log("error", message, metadata);
    }
}

module.exports = new Logger("NeraSika-Pmt-Gw");
