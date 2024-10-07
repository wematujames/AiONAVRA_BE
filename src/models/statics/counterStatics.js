module.exports = {
    /* Get next count for counter */
    getNextCount: async function getNextCount(name) {
        return this.findOneAndUpdate(
            { name },
            { $inc: { sequence: 1 } },
            { safe: true, upsert: true, new: true },
        );
    },

    /* Start new  counter */
    intializeCounter: async function iniCounter(name, sequence = 100000, prefix = "") {
        return this.create({ name, sequence, prefix });
    },
};
