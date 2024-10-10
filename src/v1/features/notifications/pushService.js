const axios = require("axios");

async function sendPushNotification({
    expoPushToken, title, body, data,
}) {
    const message = {
        to: expoPushToken, sound: "default", title, body, data,
    };

    await axios("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
}

module.exports = { sendPushNotification };
