const Bull = require("bull");
const { redis, application } = require("../../config/app");
const { logger } = require("../utils");
const { emailService } = require("../features/notifications");

const queueName = `${application.queuePrefix}-nerasika-email-queue`;
const emailQueue = new Bull(queueName, {
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

emailQueue.process(async (job) => {
    await emailService.sendMail(
        job.data?.to,
        job.data?.subject,
        job.data?.view,
        job.data?.data,
    );
});

emailQueue.on("completed", (job) => {
    logger.info(`Job with id ${job.id} completed`);
});

emailQueue.on("failed", (job, err) => {
    logger.info(
        `Job with id ${job.id} failed`,
        err,
    );
});

const dispatch = async (to, subject, data, view) => {
    await emailQueue.add({
        to, subject, data, view,
    });
};

module.exports = { dispatch, queue: emailQueue };
