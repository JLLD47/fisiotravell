const router = require("express").Router();

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const exerciseRouter = require("./exercise.router");
const routineRouter = require("./routine.router");
const regionRouter = require("./region.router");
const categoryRouter = require("./category.router");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/exercise", exerciseRouter);
router.use("/routine", routineRouter);
router.use("/region", regionRouter);
router.use("/category", categoryRouter);

module.exports = router;
