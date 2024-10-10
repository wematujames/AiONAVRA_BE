const baseService = require("../common/baseService");
const { User, Token } = require("../../../models");
const { generatePassword } = require("../../utils/common");
const emailQueue = require("../../queues/emailQueue");
const { frontEnd } = require("../../config/app");

module.exports = {
    ...baseService(User),

    /**
     * @param {object} data  data create resource
     * @returns {object} newly created resource
     */
    async create(data, currentUser) {
        const password = generatePassword(20);

        const user = await User.create({
            ...data,
            createdBy: currentUser.id,
            password,
        });

        const tokens = await Token.create({ user: user.id });

        user.tokens = tokens.id;
        await user.save();

        console.log(user);
        emailQueue.dispatch(
            user.email,
            "Welcome to AiONAVRA",
            {
                name: user.fName,
                email: user.email,
                password,
                loginUrl: frontEnd.loginUrl,
            },
            "user_credentials",
        );

        return user;
    },
};
