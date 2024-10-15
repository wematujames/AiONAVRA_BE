const cron = require("node-cron");
const { threading } = require("../../config/app");
const appointmentJobs = require("../features/appointment/appointmentJobs");

module.exports = {
    notifyAppointment: cron.schedule(
        "30 * * * * * ",
        async () => {
            if (process.env.NODE_ENV === "local") {
                await appointmentJobs.notifyAppointment();
                return;
            }

            if (
                ["production", "development"].includes(process.env.NODE_ENV)
                && process.env.pm_id === threading.processor1
            ) {
                await appointmentJobs.notifyAppointment();
            }
        },
        { scheduled: false },
    ),
};
