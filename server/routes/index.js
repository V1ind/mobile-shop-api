const Router = require("express");
const userRouter = require("./deviceRouter");
const deviceRouter = require("./deviceRouter");

const router = new Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);

module.exports = router;
