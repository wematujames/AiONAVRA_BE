const { Feedback } = require("../../../models");
const baseService = require("../common/baseService");

module.exports = {
    ...baseService(Feedback),
};
