const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const express = require("express");

const viewPath = path.resolve("./src/v1", "templates/views/emails/");

const { mail } = require("../../config/app");
const { logger } = require("../../utils");

const transporter = nodemailer.createTransport({
    host: mail.smtp.host,
    port: mail.smtp.port,
    auth: {
        user: mail.smtp.username,
        pass: mail.smtp.password,
    },
});

transporter.use(
    "compile",
    hbs({
        viewEngine: {
            extName: ".handlebars",
            layoutsDir: viewPath,
            defaultLayout: false,
            express,
        },
        viewPath,
        extName: ".handlebars",
    }),
);

const sendMail = async (to, subject, view, data) => {
    const mailOptions = {
        from: mail.from,
        to,
        subject,
        template: view,
        context: data,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        logger.error(err);
    }
};

module.exports = sendMail;
