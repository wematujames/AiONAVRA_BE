const moment = require("moment");
const { Appoinment, Visitor, User } = require("../../../models");
const Appointment = require("../../../models/Appointment");
const baseService = require("../common/baseService");
const pushQueue = require("../../queues/pushQueue");

module.exports = {
    ...baseService(Appoinment),

    /**
     * @param {object} data  data create resource
     * @returns {object} newly created resource
     */
    async create(data, user) {
        await Appointment.create(data);

        const employee = await User.findById(data.employee).populate("tokens");

        if (!employee.tokens) return;

        // send push notification to employee
        await pushQueue.dispatch({
            expoPushToken: employee.tokens?.pushToken,
            title: `New appointment with ${user.fName}`,
            body: `${user.fName} has scheduled an appointment with`
                    + ` you on ${data.date}. Will you be available ? `,
            data: { key: "val" },
        });
    },

    /**
     * @param {object} data  data create resource
     * @returns {object} newly created resource
     */
    async notifyAppointment() {
        const appointments = await Appointment.find({
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
                    data: { key: "val" },
                });
            }

            if (employee.tokens?.pushToken) {
                await pushQueue.dispatch({
                    expoPushToken: employee.tokens?.pushToken,
                    title: `Upcoming appointment with ${visitor.fName} `,
                    body: `${employee.fName}, your scheduled appointment with `
                        + `${visitor.fName} is due in 5 minutes.`,
                    data: { key: "val" },
                });
            }
        });
    },
};
