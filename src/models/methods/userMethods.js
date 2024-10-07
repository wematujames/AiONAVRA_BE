const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { customAlphabet } = require("nanoid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../Token");

const nanoid = customAlphabet("1234567890", 10);

const privateKey = fs.readFileSync(path.join(path.resolve("./"), "jwt.key"));

module.exports = {
    async isValidPassword(password) {
        return bcrypt.compare(password, this.password);
    },

    async generateToken(type, validity = 5 * 60 * 1000) {
        // Generate token
        const token = crypto.randomBytes(50).toString("hex");

        if (!(["login", "verifyEmail", "verifyPhone", "passwordReset"].includes(type))) {
            return null;
        }

        // Hash token and save
        await Token.findByIdAndUpdate(this.tokens, {
            [type]: {
                token: crypto.createHash("SHA256").update(token).digest("hex"),
                expire: new Date(Date.now() + validity),
            },
        });

        return token;
    },

    async isValidToken(type, tokenStr) {
        const userTokens = await Token.findById(this.tokens);
        const token = userTokens[type];

        if (!token) return false;

        const hashedToken = crypto.createHash("SHA256").update(tokenStr).digest("hex");

        return (hashedToken === token.token && new Date(token.expire) > new Date(Date.now()));
    },

    /* Gen random opt (len 6) and set exp */
    async genOTP() {
        this.otpCode = nanoid(6);
        this.otpCodeExpire = new Date(Date.now() + 5 * 60 * 1000);

        await this.save();

        return this.otpCode;
    },
    async isValidOTP(code) {
        return this.otpCode === code && new Date(this.otpCodeExpire) > new Date(Date.now());
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
