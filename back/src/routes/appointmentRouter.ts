import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentController";

const appointmentRouter = Router();

//*GET/appointments
appointmentRouter.get("/", getAllAppointments)
//*GET/appointments/:id
appointmentRouter.get("/:id", getAppointmentById)
//*POST/appointments/schedule
appointmentRouter.post("/schedule", schedule)
//*POST/appointments/cancel
appointmentRouter.put("/cancel", cancel)

export default appointmentRouter;