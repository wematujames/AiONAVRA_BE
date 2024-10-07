const fs = require("fs");
const path = require("path");
const { logger } = require("../utils");
const {
    Person, User, Permission, Token,
} = require("../../models");
const connectDB = require("../../config/connectDB");

connectDB();

const person = JSON.parse(fs.readFileSync(path.join(__dirname, "/person.json")));
const user = JSON.parse(fs.readFileSync(path.join(__dirname, "/user.json")));
const token = JSON.parse(fs.readFileSync(path.join(__dirname, "/token.json")));
const permissions = JSON.parse(fs.readFileSync(path.join(__dirname, "/permissions.json")));

/* Import seeding data => `node seeder -i` */
const importData = async () => {
    await Permission.create(permissions);
    await Token.create(token);
    await Person.create(person);
    await User.create(user);

    await User.findByIdAndUpdate("653aa38f270ed635145bfd04", {
        permissions: permissions.map((perm) => perm._id),
    });

    logger.info("Successfully imported seed data");
    process.exit(1);
};

/* delete seeding data `node seeder -d` */
const deleteData = async () => {
    await Person.findByIdAndDelete("6531ba56efe3ec22658f8d6c");
    await User.findByIdAndDelete("653aa38f270ed635145bfd04");
    await Token.findByIdAndDelete("66964c1942fa2c9bf4876dbe");
    await Permission.deleteMany({});

    logger.info("Successfully deleted seed data");
    process.exit(1);
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
