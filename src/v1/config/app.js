require("dotenv").config();

module.exports = {
    frontEnd: {
        passwordResetUrl: process.env.ADMIN_APP_PASSWORD_RESET_URL,
        verifyEmailUrl: process.env.ADMIN_EMAIL_VERIFICATION_URL,
        loginUrl: process.env.ADMIN_USER_LOGIN_URL,
        appUrl: process.env.ADMIN_FRONTEND_URL,
    },
    auth: {
        jwtExpire: process.env.JWT_EXPIRE || "30d",
    },
    sms: {
        keys: {},
        urls: {},
    },
    mail: {
        from: process.env.MAIL_FROM_ADDRESS,
        smtp: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            username: process.env.MAIL_USER,
            password: process.env.MAIL_PASSWORD,
        },
    },
};
