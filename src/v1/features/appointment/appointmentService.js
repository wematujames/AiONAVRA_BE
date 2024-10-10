const { Appoinment } = require("../../../models");
const Appointment = require("../../../models/Appointment");
const baseService = require("../common/baseService");
const pushQueue = require("../../queues/pushQueue");
const User = require("../../../models/User");

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
};
