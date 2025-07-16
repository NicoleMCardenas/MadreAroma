import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentController";
import validateAppointment from "../middlewares/validateAppointmentMiddleware";

const appointmentRouter = Router();

//*GET/appointments
appointmentRouter.get("/", getAllAppointments)
//*GET/appointments/:id
appointmentRouter.get("/:turnId", getAppointmentById)
//*POST/appointments/schedule
appointmentRouter.post("/schedule", validateAppointment, schedule)
//*POST/appointments/cancel
appointmentRouter.put("/cancel/:turnId", cancel)

export default appointmentRouter;