const baseController = require("../common/baseController");
const userService = require("./userService");
const { asyncHandler } = require("../../middleware");
const { SuccessResponse, ErrorResponse } = require("../../utils");

module.exports = {
    ...baseController(userService),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    advancedResult: asyncHandler(async (req, res, next) => {
        const result = await userService.advancedResult(req.query, ["createdBy"]);

        return res.json(new SuccessResponse("Success", result.data, result.meta));
    }),

    // @Description             // Find entity resource by id
    // @route                   // GET api/{{resourceName}}/:id
    // @auth                    // Required
    findById: asyncHandler(async (req, res, next) => {
        const resource = await userService.findById(req.params.id, ["office"]);

        if (!resource) return next(new ErrorResponse("No resource with id found", 404));

        return res.json(new SuccessResponse("Found Resource", resource));
    }),
};
