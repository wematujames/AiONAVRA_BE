const { asyncHandler } = require("../../middleware");
const { ErrorResponse, SuccessResponse } = require("../../utils");
const baseController = require("../common/baseController");
const directionService = require("./directionService");

module.exports = {
    ...baseController(directionService),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    advancedResult: asyncHandler(async (req, res, next) => {
        const result = await directionService.advancedResult(req.query, ["occupant"]);

        return res.json(new SuccessResponse("Success", result.data, result.meta));
    }),

    // @Description             // Find entity resource by id
    // @route                   // GET api/{{resourceName}}/:id
    // @auth                    // Required
    findById: asyncHandler(async (req, res, next) => {
        const resource = await directionService.findById(req.params.id, ["occupant"]);

        if (!resource) return next(new ErrorResponse("No resource with id found", 404));

        return res.json(new SuccessResponse("Found Resource", resource));
    }),
};
