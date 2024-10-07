const { asyncHandler } = require("../../middleware");
const { SuccessResponse, ErrorResponse } = require("../../utils");

module.exports = (service) => ({
    // @Description             // Create a new resource
    // @route                   // POST api/{{resourceName}}
    // @auth                    // Required
    create: asyncHandler(async (req, res, next) => {
        const data = await service.create(req.body, req.user);

        return res.status(201).json(new SuccessResponse("Resource created", data));
    }),

    // @Description             // Create a new resource
    // @route                   // POST api/{{resourceName}}
    // @auth                    // Required
    createMany: asyncHandler(async (req, res, next) => {
        const data = await service.createMany(req.body, req.user);

        return res.status(201).json(new SuccessResponse("Resources created", data));
    }),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    advancedResult: asyncHandler(async (req, res, next) => {
        const result = await service.advancedResult(req.query);

        return res.json(new SuccessResponse("Success", result.data, result.meta));
    }),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    findAll: asyncHandler(async (req, res, next) => {
        const data = await service.findAll(req.query);

        return res.json(new SuccessResponse("Success", data));
    }),

    // @Description             // Find entity resource by id
    // @route                   // GET api/{{resourceName}}/:id
    // @auth                    // Required
    findById: asyncHandler(async (req, res, next) => {
        const resource = await service.findById(req.params.id);

        if (!resource) return next(new ErrorResponse("No resource with id found", 404));

        return res.json(new SuccessResponse("Found Resource", resource));
    }),

    // @Description             //Update entity resource by id
    // @route                   // PUT api/{{resourceName}}/:id
    // @auth                    // Required
    updateById: asyncHandler(async (req, res, next) => {
        let resource = await service.findById(req.params.id, [], req.user);

        if (!resource) return next(new ErrorResponse("Resource does not exist", 404));

        resource = await service.update({ _id: req.params.id }, req.body);

        return res.json(new SuccessResponse("Successfully updated resource", resource));
    }),

    // @Description             // Delete resource by id
    // @route                   // DELETE api/{{resourceName}}/:id
    // @auth                    // Required
    deleteById: asyncHandler(async (req, res, next) => {
        const resource = await service.findById(req.params.id, req.user);

        if (!resource) return next(new ErrorResponse("Resource does not exist", 404));

        await service.deleteById(req.params.id);

        return res.status(204).json(new SuccessResponse("Resource deleted"));
    }),
});
