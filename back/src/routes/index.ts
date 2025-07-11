import { Router } from "express";
import userRouter from "./userRouter";
import appointmentRouter from "./appointmentRouter";

const indexRouter = Router();
indexRouter.use("/users", userRouter);
//*"/appointments"
indexRouter.use("/appointments", appointmentRouter);
export default indexRouter;