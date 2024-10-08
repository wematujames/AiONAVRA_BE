const baseController = require("../common/baseController");
const visitorService = require("./visitorService");
const { asyncHandler } = require("../../middleware");
const { SuccessResponse } = require("../../utils");

module.exports = {
    ...baseController(visitorService),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    advancedResult: asyncHandler(async (req, res, next) => {
        const result = await visitorService.advancedResult(req.query, ["createdBy"]);

        return res.json(new SuccessResponse("Success", result.meta, result.data));
    }),
};
