const { logger } = require("./Logger");

const wrapper = function (f) {
    return async function (...args) {
        try {
            await Promise.resolve(f.apply(this, args));
        } catch (err) {
            logger.error(err);
        }
    };
};

const wrapObjectMethods = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "function") {
            // eslint-disable-next-line no-param-reassign
            obj[key] = wrapper(obj[key].bind(obj));
        }
    });
};

/* USAGE */
// Automatically wrap all methods in the object
// wrapObjectMethods(myObject);
// module.exports = myObject;

module.exports = { wrapper, wrapObjectMethods };
