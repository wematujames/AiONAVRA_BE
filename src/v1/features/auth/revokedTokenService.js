const baseService = require("../common/baseService");
const { RevokedToken } = require("../../../models");

module.exports = {
    ...baseService(RevokedToken),
};
