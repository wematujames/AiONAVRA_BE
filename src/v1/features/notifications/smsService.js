const { default: axios } = require("axios");
const { sms } = require("../../config/app");

module.exports = {
    sendSMS: async (data) => {
        console.log({
            method: "post",
            url: sms.urls.smsUrlV1,
            params: {
                to: data.to,
                msg: data.message,
                key: sms.keys.apiKeyV1,
                sender_id: sms.senderIds.pureCo,
            },
        });
        axios({
            method: "post",
            url: sms.urls.smsUrlV1,
            params: {
                to: data.to,
                msg: data.message,
                key: sms.keys.apiKeyV1,
                sender_id: sms.senderIds.pureCo,
            },
        });
    },
};
