const router = require("express").Router();

router.use("/auth", require("../features/auth").authRouter);
router.use("/userss", require("../features/users").userRouter);
router.use("/notices", require("../features/notices").noticeRouter);
router.use("/feedbacks", require("../features/feedbacks").feedbackRouter);
router.use("/directions", require("../features/directions").directionRouter);
router.use("/enquiries", require("../features/enquiries").enquiryRouter);
router.use("/appointments", require("../features/appointment").appointmentRouter);

module.exports = router;
