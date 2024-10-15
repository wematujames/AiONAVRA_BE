const mongoose = require("mongoose");
const { logger } = require("../v1/utils");

mongoose.set("strictQuery", false);

const { mongoURI } = require("./app").database;
// const { logger } = require("../v1/utils");

module.exports = async () => {
    try {
        const conn = await mongoose.connect(mongoURI);
        logger.info(`DB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        logger.info("DB connection error", error);
        return null;
    }
};
