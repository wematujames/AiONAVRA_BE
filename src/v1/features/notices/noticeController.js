const noticeService = require("./noticeService");
const baseController = require("../common/baseController");

module.exports = {
    ...baseController(noticeService),
};
