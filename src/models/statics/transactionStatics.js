const moment = require("moment");

module.exports = {
    async getCollectionSummary(merchant) {
        const today = moment().startOf("day").toDate();
        const networks = [
            {
                $group: {
                    _id: "$processor",
                    today: { $sum: { $cond: [{ $gte: ["$createdAt", today] }, "$amount", 0] } },
                    allTime: { $sum: "$amount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    network: "$_id",
                    today: 1,
                    allTime: { $convert: { input: "$allTime", to: "double" } }, // Convert to double
                },
            },
        ];

        const graph = [
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                    total: { $sum: "$amount" },
                },
            },
            { $sort: { _id: -1 } }, { $limit: 7 }, { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    day: "$_id",
                    count: 1,
                    total: { $convert: { input: "$total", to: "double" } },
                },
            },
        ];

        const condition = {
            type: { $in: ["collection", "collection-dd"] },
            code: "111",
        };

        if (merchant) condition.merchant = merchant;

        const data = await this.aggregate([
            {
                $match: condition,
            },
            {
                $facet: {
                    networks,
                    graph,
                },
            },
        ]);

        return data[0];
    },

    async getDisbursementSummary(merchant) {
        const today = moment().startOf("day").toDate();

        const networks = [
            {
                $group: {
                    _id: "$processor",
                    today: { $sum: { $cond: [{ $gte: ["$createdAt", today] }, "$amount", 0] } },
                    allTime: { $sum: "$amount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    network: "$_id",
                    today: 1,
                    allTime: { $convert: { input: "$allTime", to: "double" } },
                },
            },
        ];

        const graph = [
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                    total: { $sum: "$amount" },
                },
            },
            { $sort: { _id: -1 } }, { $limit: 7 }, { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0, day: "$_id", count: 1, total: { $convert: { input: "$total", to: "double" } },
                },
            },
        ];

        const condition = {
            type: { $in: ["disbursement-b2c", "disbursement-b2b"] },
            code: "111",
        };

        if (merchant) condition.merchant = merchant;

        const data = await this.aggregate([
            {
                $match: condition,
            },
            {
                $facet: {
                    networks,
                    graph,
                },
            },
        ]);

        return data[0];
    },

    async  transactionSummary(merchant) {
        const today = moment().startOf("day").toDate();

        const colToday = [
            {
                $match: {
                    type: { $in: ["collection", "collection-dd"] },
                    code: "111",
                    createdAt: { $gte: today },
                },
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    amount: { $sum: "$amount" },
                },
            },
        ];

        const colAllTime = [
            {
                $match: {
                    type: { $in: ["collection", "collection-dd"] },
                    code: "111",
                },
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    amount: { $sum: "$amount" },
                },
            },
        ];

        const disToday = [
            {
                $match: {
                    type: "disbursement-b2c",
                    code: "111",
                    createdAt: { $gte: today },
                },
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    amount: { $sum: "$amount" },
                },
            },
        ];

        const disAllTime = [
            {
                $match: {
                    type: { $in: ["disbursement-b2c"] },
                    code: "111",
                },
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    amount: { $sum: "$amount" },
                },
            },
        ];

        if (merchant) {
            colToday[0].$match.merchant = merchant;
            colAllTime[0].$match.merchant = merchant;
            disToday[0].$match.merchant = merchant;
            disAllTime[0].$match.merchant = merchant;
        }

        const result = await this.aggregate([
            {
                $facet: {
                    colToday,
                    colAllTime,
                    disToday,
                    disAllTime,
                },
            },
            {
                $project: {
                    colTodayCount: { $ifNull: [{ $arrayElemAt: ["$colToday.count", 0] }, 0] },
                    colTodayAmt: { $convert: { input: { $ifNull: [{ $arrayElemAt: ["$colToday.amount", 0] }, 0] }, to: "double" } },
                    colTotalCount: { $ifNull: [{ $arrayElemAt: ["$colAllTime.count", 0] }, 0] },
                    colTotalAmt: { $convert: { input: { $ifNull: [{ $arrayElemAt: ["$colAllTime.amount", 0] }, 0] }, to: "double" } },
                    disTodayCount: { $ifNull: [{ $arrayElemAt: ["$disToday.count", 0] }, 0] },
                    disTodayAmt: { $convert: { input: { $ifNull: [{ $arrayElemAt: ["$disToday.amount", 0] }, 0] }, to: "double" } },
                    disTotalCount: { $ifNull: [{ $arrayElemAt: ["$disAllTime.count", 0] }, 0] },
                    disTotalAmt: { $convert: { input: { $ifNull: [{ $arrayElemAt: ["$disAllTime.amount", 0] }, 0] }, to: "double" } },
                },
            },
        ]);

        return result[0];
    },
};
