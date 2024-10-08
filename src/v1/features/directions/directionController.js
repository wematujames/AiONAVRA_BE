const baseController = require("../common/baseController");
const directionService = require("./directionService");

module.exports = {
    ...baseController(directionService),
};
