const { asyncHandler } = require("../../middleware");
const { SuccessResponse } = require("../../utils");
const groqAi = require("./groqAi");

module.exports = {
    makeEnquiry: asyncHandler(async (req, res, next) => {
        const response = await groqAi(req.body.messages);

        res.json(new SuccessResponse("Success", {
            response,
        }));
    }),
};
