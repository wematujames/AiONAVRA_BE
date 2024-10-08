const baseController = require("../common/baseController");
const userService = require("./userService");
const { asyncHandler } = require("../../middleware");
const { SuccessResponse } = require("../../utils");

module.exports = {
    ...baseController(userService),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    advancedResult: asyncHandler(async (req, res, next) => {
        const result = await userService.advancedResult(req.query, ["createdBy"]);

        return res.json(new SuccessResponse("Success", result.data, result.meta));
    }),
};
