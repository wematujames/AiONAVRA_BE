const bcrypt = require("bcryptjs");

module.exports = {
    async preSaveActions(next) {
        // Don't encrypt if password again if it's not modified
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    },
};
