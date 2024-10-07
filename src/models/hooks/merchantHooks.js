const bcrypt = require("bcryptjs");

module.exports = {
    async preSaveActions(next) {
        if (this.isModified("email")) this.emailVerified = false;

        if (this.isModified("phone")) this.phoneVerified = false;

        // Dont encrypt if password again if it's not modified
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    },
};
