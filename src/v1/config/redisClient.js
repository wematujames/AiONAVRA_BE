const { createClient } = require("redis");
const redisCreds = require("../../config/app").redis;
const { logger } = require("../utils");

let client;

async function connect() {
    if (client) return client;

    client = createClient({
        username: redisCreds.username,
        password: redisCreds.password,
        socket: {
            host: redisCreds.host,
            port: redisCreds.port,
        },
    });

    client.on("error", (err) => {
        logger.error("Redis error:", err);
    });

    client.on("connect", () => {
        logger.info("Redis connected");
    });

    client.on("end", () => {
        logger.info("Redis connection closed");
    });

    await client.connect().catch((err) => {
        logger.error("Redis connection error:", err);
    });

    return client;
}

async function disconnect() {
    if (client) {
        await client.quit().catch((err) => {
            logger.error("Error closing Redis connection:", err);
        });
    }
}

module.exports = { connect, disconnect };
