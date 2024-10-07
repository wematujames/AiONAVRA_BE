const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const { mongoURI } = require("./app").database;
// const { logger } = require("../v1/utils");

module.exports = async () => {
    try {
        const conn = await mongoose.connect(mongoURI);
        console.info(`DB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.info("DB connection error", error);
        return null;
    }
};
