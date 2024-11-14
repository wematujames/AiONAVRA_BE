require("dotenv").config();

module.exports = {
    application: {
        env: process.env.NODE_ENV || "development",
        port: process.env.PORT || 3000,
        queuePrefix: process.env.QUEUE_PREFIX || "q",
    },
    threading: {
        processor1: process.env.PM2_PROCESS_ID_1,
        processor2: process.env.PM2_PROCESS_ID_2,
    },
    database: {
        mongoURI: process.env.MONGOURI,
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
        username: process.env.REDIS_USERNAME || "",
        password: process.env.REDIS_PASSWORD || "",
    },
    sms: {
        keys: {
            apiKeyV1: process.env.SMS_API_KEY_v1,
            apiKeyV2: process.env.SMS_API_KEY_v2,
        },
        urls: {
            smsUrlV1: process.env.SMS_URL,
        },
        senderIds: {
            pureCo: process.env.SMS_SENDER_ID,
        },
    },
};
