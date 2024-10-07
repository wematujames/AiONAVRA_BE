const slugify = require("slugify");

module.exports = {
    genSlug(next) {
        if (!this.slug) this.slug = slugify(this.name);
        next();
    },
};
