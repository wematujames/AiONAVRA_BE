const noticeService = require("./noticeService");
const baseController = require("../common/baseController");
const { asyncHandler } = require("../../middleware");
const { SuccessResponse, ErrorResponse } = require("../../utils");
const { Token } = require("../../../models");
const pushQueue = require("../../queues/pushQueue");

module.exports = {
    ...baseController(noticeService),

    // @Description             // Create a new resource
    // @route                   // POST api/{{resourceName}}
    // @auth                    // Required
    create: asyncHandler(async (req, res, next) => {
        const data = await noticeService.create(req.body, req.user);

        res.status(201).json(new SuccessResponse("Resource created", data));

        const pushTokens = await Token.find({}).select("pushToken");

        pushTokens.filter((t) => t.pushToken.trim() !== "").forEach(async (token) => {
            await pushQueue.dispatch({
                expoPushToken: token.pushToken,
                title: "A new notice was posted",
                body: `${data.priority}: ${data.title}`,
                data: { type: "NewNotice", payload: { noticeId: data.id } },
            });
        });
    }),

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
