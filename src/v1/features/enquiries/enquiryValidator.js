const { checkSchema } = require("express-validator");

exports.makeEnquiry = checkSchema({
    messages: {
        in: ["body"],
        isArray: {
            errorMessage: "Messages should be an array",
        },
    },
    "messages.*.content": {
        in: ["body"],
        isString: {
            errorMessage: "Content must be a string",
        },
        notEmpty: {
            errorMessage: "Content cannot be empty",
        },
    },
    "messages.*.role": {
        in: ["body"],
        isString: {
            errorMessage: "Role must be a string if provided",
        },
    },
    "messages.*": {
        custom: {
            options: (value) => {
                if (!value.sender && !value.role) {
                    throw new Error("Either sender or role must be provided");
                }
                return true;
            },
        },
    },
});
