const moment = require("moment");
const { Visitor, User } = require("../../../models");
const Appointment = require("../../../models/Appointment");
const pushQueue = require("../../queues/pushQueue");

module.exports = {

    /**
     * @param {object} data  data create resource
     * @returns {object} newly created resource
     */
    async notifyAppointment() {
        const appointments = await Appointment.find({
            status: "confirmed",
            date: {
                $gte: moment().toDate(),
                $lte: moment().add(5, "minutes").toDate(),
            },
        }).populate("visitor").populate("employee");

        appointments.forEach(async (apt) => {
            const employee = await User.findById(apt.employee).populate("tokens");
            const visitor = await Visitor.findById(apt.visitor).populate("tokens");

            // send push notification to employee
            if (visitor.tokens?.pushToken) {
                await pushQueue.dispatch({
                    expoPushToken: employee.tokens?.pushToken,
                    title: `Upcoming appointment with ${employee.fName} `,
                    body: `${visitor.fName}, your scheduled appointment with `
                        + `${employee.fName} is due in 5 minutes.`,
                    data: { type: "appointment-reminder", appointmentId: apt._id },
                });
            }

            if (employee.tokens?.pushToken) {
                await pushQueue.dispatch({
                    expoPushToken: employee.tokens?.pushToken,
                    title: `Upcoming appointment with ${visitor.fName} `,
                    body: `${employee.fName}, your scheduled appointment with `
                        + `${visitor.fName} is due in 5 minutes.`,
                    data: { type: "appointment-reminder", appointmentId: apt._id },
                });
            }
        });
    },
};
