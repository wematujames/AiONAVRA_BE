const Bull = require("bull");
const { redis } = require("../../config/app");
const { logger } = require("../utils");
const { smsService } = require("../features/notifications");

const queueName = "aionavra-sms-queue";

const smsQueue = new Bull(queueName, {
    redis: {
        host: redis.host,
        port: redis.port,
        password: redis.password,
    },
    limiter: {
        max: 100,
        duration: 10000,
    },
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 10000,
        },
    },
});

smsQueue.process(async (job) => {
    await smsService.sendSMS(job.data);
});

smsQueue.on("completed", (job) => logger.info(
    `${queueName} job with id ${job.id} completed`,
));

smsQueue.on("failed", (job, err) => logger.info(
    `${queueName} job with id ${job.id} failed`,
    err,
));

const dispatch = async (data) => {
    await smsQueue.add(data);
};

module.exports = { dispatch, queue: smsQueue };
