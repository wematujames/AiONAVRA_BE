const { checkSchema } = require("express-validator");

module.exports = {
    enable2fa: checkSchema({
        verficationCode: {
            trim: true,
            notEmpty: { bail: true },
            isLength: 6,
        },
    }),

    login: checkSchema({
        email: {
            trim: true,
            isEmail: { bail: true },
        },
        password: {
            notEmpty: { bail: true },
            errorMessage: "Password must not be empty",
        },
    }),

    login2fa: checkSchema({
        loginToken: {
            in: ["body"],
            trim: true,
            notEmpty: { bail: true },
        },
        verificationCode: {
            in: ["body"],
            trim: true,
            notEmpty: { bail: true },
            isLength: 6,
            errorMessage: "Verification is required and must be valid",
        },
    }),

    updateUserProfile: checkSchema({
        fName: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
            errorMessage: "First name cannot be empty",
        },
        lName: {
            optional: true,
            trim: true,
            notEmpty: { bail: true },
            errorMessage: "Last name cannot be empty",
        },
        password: {
            in: ["body"],
            notEmpty: { bail: true },
            errorMessage: "Password is required",
        },
    }),

    updateUserEmail: checkSchema({
        currentEmail: {
            optional: true,
            trim: true,
            isEmail: { bail: true },
            errorMessage: "A valid email address is required",
        },
        newEmail: {
            optional: true,
            trim: true,
            isEmail: { bail: true },
            errorMessage: "A valid email address is required",
        },
        password: {
            in: ["body"],
            notEmpty: { bail: true },
            errorMessage: "Password is required",
        },
    }),

    updateUserMobile: checkSchema({
        currentPhone: {
            trim: true,
            notEmpty: { bail: true },
            errorMessage: "Current mobile number is required",
            in: ["body"],
            customSanitizer: {
                options: (_value) => {
                    const value = _value.replace(/\D/g, "");

                    if (value.startsWith("0")) return `233${value.slice(1)}`;

                    if (!value.startsWith("233")) return `233${value}`;

                    return value;
                },
            },
            isNumeric: {
                errorMessage: "Phone number must be numeric",
            },
        },
        newPhone: {
            trim: true,
            notEmpty: { bail: true },
            errorMessage: "New mobile number is required",
            customSanitizer: {
                options: (_value) => {
                    const value = _value.replace(/\D/g, "");

                    if (value.startsWith("0")) return `233${value.slice(1)}`;

                    if (!value.startsWith("233")) return `233${value}`;

                    return value;
                },
            },
            isNumeric: {
                errorMessage: "Phone number must be numeric",
            },
        },
        password: {
            notEmpty: { bail: true },
            errorMessage: "Password is required",
        },
    }),

    updatePassword: checkSchema({
        currentPassword: {
            notEmpty: { bail: true },
            errorMessage: "Current password is required",
            // isStrongPassword: {
            //     bail: true,
            //     errorMessage: "Password must be strong",
            // },
        },
        newPassword: {
            notEmpty: { bail: true },
            errorMessage: "New password is required",
            // isStrongPassword: {
            //     bail: true,
            //     errorMessage: "Password must be strong",
            // },
        },
        confirmNewPassword: {
            notEmpty: { bail: true },
            errorMessage: "Please confirm new password",
            // isStrongPassword: {
            //     bail: true,
            //     errorMessage: "Password must be strong",
            // },
        },

    }),

    verifyEmail: checkSchema({
        token: {
            trim: true,
            notEmpty: { bail: true },
            errorMessage: "Verification token is required",
        },
    }),

    verifyPhone: checkSchema({
        otpCode: {
            trim: true,
            notEmpty: { bail: true },
            errorMessage: "Otp code is required",
        },
    }),

    forgotPassword: checkSchema({
        email: {
            trim: true,
            isEmail: { bail: true },
        },
    }),

    resetPassword: checkSchema({
        resetToken: {
            trim: true,
            notEmpty: { bail: true },
            errorMessage: "Reset token is required",
        },
        newPassword: {
            notEmpty: { bail: true },
            errorMessage: "Password is required | Password must be strong",
            // isStrongPassword: {
            //     bail: true,
            //     errorMessage: "Password must be strong",
            // },
        },
    }),
};
