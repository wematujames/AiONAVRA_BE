const { randomBytes } = require("crypto");
const bcrypt = require("bcryptjs");
const { customAlphabet } = require("nanoid");

module.exports = {
    async generateMerchantId() {
        const generate = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 20);

        return generate();
    },

    async generateMerchantKeys() {
        const generate = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 20);

        const apiUser = generate();

        function generateKey(size = 32, format = "base64") {
            const buffer = randomBytes(size);
            return buffer.toString(format);
        }

        const key = generateKey();

        /* Hash client secret */
        const salt = await bcrypt.genSalt(10);
        const secretHash = await bcrypt.hash(key, salt);

        return { merchantId: apiUser, merchantSecret: key, hashedMerchantSecret: secretHash };
    },
};
