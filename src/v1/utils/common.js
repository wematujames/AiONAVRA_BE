const crypto = require("crypto");

module.exports = {
    generatePassword(length = 20) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                        + "!@#$%^&*()_+~|}{[]:;?><,./-=";

        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = crypto.randomInt(0, charset.length);
            password += charset[randomIndex];
        }

        return password;
    },
};
