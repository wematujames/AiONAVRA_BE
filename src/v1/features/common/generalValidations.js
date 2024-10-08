const { ObjectId } = require("mongoose").Types;
const { checkSchema } = require("express-validator");

module.exports = {
    readOneOrDelete: checkSchema({
        id: {
            in: ["params"],
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Resource id is required",
            },
            custom: {
                options: (val) => ObjectId.isValid(new ObjectId(val)),
                bail: true,
                errorMessage: "Invalid resource id",
            },
        },
    }),
    requireId: checkSchema({
        id: {
            in: ["params"],
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Resource id is required",
            },
            custom: {
                options: (val) => ObjectId.isValid(new ObjectId(val)),
                bail: true,
                errorMessage: "Invalid resource id",
            },
        },
    }),
    requireMerchantId: checkSchema({
        merchantId: {
            in: ["params"],
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Merchant id is required",
            },
            custom: {
                options: (val) => ObjectId.isValid(new ObjectId(val)),
                bail: true,
                errorMessage: "Invalid merchant id",
            },
        },
    }),
    requireMandateId: checkSchema({
        mandateId: {
            in: ["params"],
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Mandate Id is required",
            },
            custom: {
                options: (val) => ObjectId.isValid(new ObjectId(val)),
                bail: true,
                errorMessage: "Invalid mandateId",
            },
        },
    }),
    requireTxnId: checkSchema({
        transactionId: {
            in: ["params"],
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Transaction Id is required",
            },
            custom: {
                options: (val) => ObjectId.isValid(new ObjectId(val)),
                bail: true,
                errorMessage: "Invalid transactionId",
            },
        },
    }),
};
