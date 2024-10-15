const appointmentCrons = require("./appointmentCrons");
const { logger } = require("../utils");

module.exports = () => {
    appointmentCrons.notifyAppointment.start();

    logger.info("Jobs running");
};
