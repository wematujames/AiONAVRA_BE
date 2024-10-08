const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const xssClean = require("xss-clean");

const { application } = require("./config/app");

// const logger = require("./utils/Logger");

const app = express();
require("./config/connectDB")();

// require("./v1/jobs")();
// require("./v1/config/redisClient");

app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(express.json());
app.use(fileUpload());
app.use(xssClean());
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", require("./v1/routes"));

app.set("port", Number(application.port));
app.listen(app.get("port") || application.port, () => {
    console.log(`App running on ${application.port}`);
    // logger.info(`Gh running on ${application.port} in ${application.env} mode!`);
});
