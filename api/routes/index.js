const router = require("express").Router();

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const exerciseRouter = require("./exercise.router");
const routineRouter = require("./routine.controller");
//const regionRouter = require("./region.controller");
//const categoryRouter = require("./category.controller");

router.use("/auth", authRouter);
router.use("/user", userRouter);
//router.use("/exercise", exerciseRouter);
//router.use("/routine", routineRouter);
//router.use("/region", regionRouter);
//router.use("/category", categoryRouter);

module.exports = router;
