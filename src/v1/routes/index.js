const router = require("express").Router();

router.use("/auth", require("../features/auth").authRouter);
router.use("/visitorauth", require("../features/visitorAuth").visitorAuthRouter);
router.use("/users", require("../features/users").userRouter);
router.use("/notices", require("../features/notices").noticeRouter);
router.use("/feedbacks", require("../features/feedbacks").feedbackRouter);
router.use("/routes", require("../features/directions").directionRouter);
router.use("/enquiries", require("../features/enquiries").enquiryRouter);
router.use("/appointments", require("../features/appointment").appointmentRouter);

module.exports = router;
