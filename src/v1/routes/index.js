const router = require("express").Router();

router.use("/auth", require("../features/auth").authRouter);
router.use("/appointments", require("../features/appointment").appointmentRouter);

module.exports = router;
