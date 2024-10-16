const { Appoinment, User } = require("../../../models");
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
        const appointment = await Appointment.create(data);

        const employee = await User.findById(data.employee).populate("tokens");

        if (!employee.tokens) return;

        // send push notification to employee
        await pushQueue.dispatch({
            expoPushToken: employee.tokens?.pushToken,
            title: `Appointment request from ${user.fName}`,
            body: `${user.fName} has scheduled an appointment with`
                    + ` you on ${data.date}. Will you be available ? `,
            data: { type: "appointment-request", appointmentId: appointment._id },
        });
    },
};
