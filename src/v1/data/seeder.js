const fs = require("fs");
const path = require("path");
const { logger } = require("../utils");
const { User, Token } = require("../../models");
const connectDB = require("../../config/connectDB");

connectDB();

const user = JSON.parse(fs.readFileSync(path.join(__dirname, "/user.json")));
const token = JSON.parse(fs.readFileSync(path.join(__dirname, "/token.json")));

/* Import seeding data => `node seeder -i` */
const importData = async () => {
    await Token.create(token);
    await User.create(user);

    logger.info("Successfully imported seed data");
    process.exit(1);
};

/* delete seeding data `node seeder -d` */
const deleteData = async () => {
    await User.findByIdAndDelete("653aa38f270ed635145bfd04");
    await Token.findByIdAndDelete("66964c1942fa2c9bf4876dbe");

    logger.info("Successfully deleted seed data");
    process.exit(1);
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
