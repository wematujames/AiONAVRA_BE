const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");
const { queue: emailQueue } = require("./emailQueue");
const { queue: smsQueue } = require("./smsQueue");

const { router } = createBullBoard([
    new BullAdapter(emailQueue),
    new BullAdapter(smsQueue),
]);

module.exports = router;
