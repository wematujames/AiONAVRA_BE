const Bull = require("bull");
const { redis, application } = require("../../config/app");
const { logger } = require("../utils");
const { pushService } = require("../features/notifications");

const queueName = `${application.queuePrefix}-nerasika-sms-queue`;

const pushQueue = new Bull(queueName, {
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

pushQueue.process(async (job) => {
    await pushService.sendPushNotification(job.data);
});

pushQueue.on("completed", (job) => logger.info(
    `${queueName} job with id ${job.id} completed`,
));

pushQueue.on("failed", (job, err) => logger.info(
    `${queueName} job with id ${job.id} failed`,
    err,
));

const dispatch = async (data) => {
    await pushQueue.add(data);
};

module.exports = { dispatch, queue: pushQueue };
