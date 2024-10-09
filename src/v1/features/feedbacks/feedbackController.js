const { asyncHandler } = require("../../middleware");
const { SuccessResponse } = require("../../utils");
const baseController = require("../common/baseController");
const feedbackService = require("./feedbackService");

module.exports = {
    ...baseController(feedbackService),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    advancedResult: asyncHandler(async (req, res, next) => {
        const result = await feedbackService.advancedResult(req.query, ["user"]);

        return res.json(new SuccessResponse("Success", result.data, result.meta));
    }),
};
