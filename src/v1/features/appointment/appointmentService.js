const { Appoinment, User, Visitor } = require("../../../models");
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

    /**
     * @param {string|number} id Id of resource to update
     * @param {object} data keys and values to be updated for resource
     * @returns {object} Update resource
     */
    async employeeSetAppointmentStatus(id, data) {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, data, { new: true });

        const visitor = await Visitor.findById(updatedAppointment.visitor).populate("tokens");
        const employee = await User.findById(updatedAppointment.employee);

        if (!visitor.tokens?.pushToken) return updatedAppointment;

        if (["confirmed", "rejected", "canceled", "cancelled"].includes(data.status)) {
            await pushQueue.dispatch({
                expoPushToken: visitor.tokens?.pushToken,
                title: `Appointment with ${employee.fName} ${data.status}`,
                body: `${visitor.fName}, your attempted appointment schedule with `
                    + `${employee.fName} was ${updatedAppointment.status}.`,
                data: { type: "appointment-status-update", appointmentId: updatedAppointment._id },
            });
        }

        return updatedAppointment;
    },
};
