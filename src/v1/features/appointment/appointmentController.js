const { asyncHandler } = require("../../middleware");
const { ErrorResponse, SuccessResponse } = require("../../utils");
const baseController = require("../common/baseController");
const appointmentService = require("./appointmentService");

module.exports = {
    ...baseController(appointmentService),

    // @Description             // Find all service resources
    // @route                   // GET api/{{resourceName}}
    // @auth                    // Required
    advancedResult: asyncHandler(async (req, res, next) => {
        const result = await appointmentService.advancedResult(req.query, ["visitor", "employee"]);

        return res.json(new SuccessResponse("Success", result.data, result.meta));
    }),

    // @Description             // Find entity resource by id
    // @route                   // GET api/{{resourceName}}/:id
    // @auth                    // Required
    findById: asyncHandler(async (req, res, next) => {
        const resource = await appointmentService.findById(req.params.id, ["visitor", "employee"]);

        if (!resource) return next(new ErrorResponse("No resource with id found", 404));

        return res.json(new SuccessResponse("Found Resource", resource));
    }),

    // @Description             //Update entity resource by id
    // @route                   // PUT api/{{resourceName}}/:id
    // @auth                    // Required
    employeeSetAppointmentStatus: asyncHandler(async (req, res, next) => {
        let resource = await appointmentService.findById(req.params.id, [], req.user);

        if (!resource) return next(new ErrorResponse("Resource does not exist", 404));

        resource = await appointmentService.employeeSetAppointmentStatus(
            { _id: req.params.id },
            req.body,
        );

        return res.json(new SuccessResponse("Successfully updated resource", resource));
    }),
};
