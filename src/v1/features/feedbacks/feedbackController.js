const baseController = require("../common/baseController");
const feedbackService = require("./feedbackService");

module.exports = {
    ...baseController(feedbackService),
};
