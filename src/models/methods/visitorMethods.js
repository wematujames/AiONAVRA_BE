const fs = require("fs");
const path = require("path");
const { customAlphabet } = require("nanoid");
const jwt = require("jsonwebtoken");

const nanoid = customAlphabet("1234567890", 10);

const privateKey = fs.readFileSync(path.join(path.resolve("./"), "jwt.key"));

module.exports = {

    /* Gen random opt (len 6) and set exp */
    async genOTP() {
        this.otpCode.code = nanoid(6);
        this.otpCode.expires = new Date(Date.now() + 5 * 60 * 1000);

        await this.save();

        return this.otpCode;
    },

    async isValidOTP(code) {
        return this.otpCode.code === code
            && new Date(this.otpCode.expires) > new Date(Date.now());
    },

    getSignedJwtToken(data, expire = "1d") {
        // eslint-disable-next-line no-underscore-dangle
        const merchantAuthData = { id: this._id, ...data };

        return jwt.sign(merchantAuthData, privateKey, {
            algorithm: "RS256",
            expiresIn: expire,
        });
    },
};
