const { Appoinment } = require("../../../models");
const baseService = require("../common/baseService");

module.exports = {
    ...baseService(Appoinment),
};
