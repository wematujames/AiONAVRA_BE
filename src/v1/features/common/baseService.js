const moment = require("moment");

module.exports = function baseService(model) {
    return {

        /**
         * @param {object} data  data create resource
         * @returns {object} newly created resource
         */
        async create(data) {
            return model.create(data);
        },

        /**
         * @param {object} data  data create resource
         * @returns {object} newly created resource
         */
        async createMany(data) {
            return model.insertMany(data);
        },

        /**
         * @param {string|number} id Id of resource to find
         * @returns {object} Found resource with specified id
         */
        async findById(id, populate = []) {
            const query = model.findById(id);

            if (populate.length) {
                populate.forEach((item) => { query.populate(item); });
            }

            return query;
        },

        /**
         * @param {object} condition criteria to match
         * @returns {object[]} resource matching match query criteria
         */
        async findOne(condition, populate = []) {
            const query = model.findOne(condition);

            if (populate.length) {
                populate.forEach((item) => { query.populate(item); });
            }

            return query;
        },

        /**
         * @param {object} condition criteria to match
         * @returns {object[]} all resource matching match query criteria
         */
        async advancedResult(condition = {}, populate = []) {
            // Copy req.query
            let query = { ...condition };

            // Fields to exclude
            const removeFields = ["_select", "_sort", "_page", "_limit", "startDate", "endDate"];

            // Loop over removeFields and delete them from reqQuery
            removeFields.forEach((param) => delete query[param]);

            // Create query string
            let queryStr = JSON.stringify(query);

            // Create operators ($gt, $gte, etc)
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

            queryStr = JSON.parse(queryStr);

            // Search for multiple values
            Object.keys(queryStr).forEach((key) => {
                if (queryStr[key].$in) {
                    queryStr[key].$in = queryStr[key].$in.split(",");
                }
            });

            if (condition.startDate) queryStr.createdAt = { $gte: moment(condition.startDate).startOf("day").toISOString() };
            if (condition.endDate) queryStr.createdAt.$lte = moment(condition.endDate).endOf("day").toISOString();

            // init mongoose query
            query = model.find(queryStr);

            // Select Fields
            if (condition._select) query.select(condition._select.split(",").join(" "));

            // Sort
            if (condition._sort) query.sort(condition._sort.split(",").join(" "));
            else query.sort("-createdAt");

            // Pagination
            const page = parseInt(condition._page, 10) || 1;
            const limit = parseInt(condition._limit, 10) || 500;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const total = await model.countDocuments(query);

            // Paginate data
            query.skip(startIndex).limit(limit);

            // support joins
            if (populate.length) populate.forEach((field) => query.populate({ path: field }));

            const results = await query;

            // Pagination result
            const pagination = {};

            if (endIndex < total) {
                pagination.next = {
                    page: page + 1,
                    limit,
                };
            }

            if (startIndex > 0) {
                pagination.prev = {
                    page: page - 1,
                    limit,
                };
            }

            return {
                meta: {
                    total,
                    count: results.length,
                    pagination,
                },
                data: results,
            };
        },

        /**
         * @param {string|number} id Id of resource to update
         * @param {object} data keys and values to be updated for resource
         * @returns {object} Update resource
         */
        async updateById(id, data) {
            return model.findByIdAndUpdate(id, data, { new: true });
        },

        /**
         * @param {object} condition criteria on which to update
         * @param {object} data keys and values to be updated for resource
         * @returns {object} Update resource
         */
        async update(condition, data) {
            return model.findOneAndUpdate(condition, data, { new: true });
        },

        /**
         * @param {string | number} id id of resource to delete
         * @returns {object} successful deletion
         */
        async deleteById(id) {
            return model.findByIdAndDelete(id);
        },

        /**
         * @param {object} condition criteria to delete on
         * @returns {object} successful deletion
         */
        async deleteOne(condition) {
            return model.deleteOne(condition);
        },

        /**
         * @param {object} condition criteria to delete on
         * @returns {object} successful deletion
         */
        async deleteMany(condition) {
            return model.deleteMany(condition);
        },
    };
};
