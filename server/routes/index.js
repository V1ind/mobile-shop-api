const Router = require("express");
const router = new Router();
const userRouter = require("./deviceRouter");
const deviceRouter = require("./deviceRouter");

router.use("/user", userRouter);
router.use("/device", deviceRouter);

module.exports = router;
