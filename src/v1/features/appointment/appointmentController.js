const baseController = require("../common/baseController");
const appointmentService = require("./appointmentService");

module.exports = {
    ...baseController(appointmentService),
};
