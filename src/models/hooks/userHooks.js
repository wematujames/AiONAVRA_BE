const bcrypt = require("bcryptjs");

module.exports = {
    async preSaveActions(next) {
        if (this.isModified("email")) {
            await this.constructor
                .model("Person")
                .findByIdAndUpdate(this.person, { email: this.email });
        }

        if (this.isModified("phone")) {
            await this.constructor
                .model("Person")
                .findByIdAndUpdate(this.person, { phone: this.phone });
        }

        // Dont encrypt if password again if it's not modified
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    },
};
