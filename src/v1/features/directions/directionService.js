const { Route } = require("../../../models");
const smsQueue = require("../../queues/smsQueue");
const baseService = require("../common/baseService");

module.exports = {
    ...baseService(Route),

    sendRouteToUser: async (route, user) => {
        await smsQueue.dispatch({
            to: "0209912997" || user.phone,
            message: `${route.name} on floor ${route.floor} using `
                    + `${route.elevation.toLowerCase() === "none" ? "no elevation" : route.elevation.toLowerCase()}\n`
                    + `\n${route.directions}`,
        });
    },
};
