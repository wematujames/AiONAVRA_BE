const noticeService = require("./noticeService");
const baseController = require("../common/baseController");
const { asyncHandler } = require("../../middleware");
const { SuccessResponse, ErrorResponse } = require("../../utils");

module.exports = {
    ...baseController(noticeService),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    advancedResult: asyncHandler(async (req, res, next) => {
        const result = await noticeService.advancedResult(req.query, ["createdBy"]);

        return res.json(new SuccessResponse("Success", result.data, result.meta));
    }),

    // @Description             // Find entity resource by id
    // @route                   // GET api/{{resourceName}}/:id
    // @auth                    // Required
    findById: asyncHandler(async (req, res, next) => {
        const resource = await noticeService.findById(req.params.id, ["createdBy"]);

        if (!resource) return next(new ErrorResponse("No resource with id found", 404));

        return res.json(new SuccessResponse("Found Resource", resource));
    }),
};
