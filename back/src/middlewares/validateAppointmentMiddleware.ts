import { Request, Response, NextFunction } from "express";
import IScheduleAppointmentDto from "../dtos/IScheduleAppointmentDto";

const validateAppointment = (
      req: Request<{}, {}, IScheduleAppointmentDto>,
      res: Response,
      next: NextFunction)=>{
const { date, time, description } = req.body;
try {
    //*Fecha
    if (!date) throw new Error ("El campo date es obligatorio");


const [year, month, day] = date.split("-");
const appointmentDate = new Date(Number(year), Number(month) - 1, Number(day));
appointmentDate.setHours(0, 0, 0, 0);
    //*Fines de semana no laborables
      const dayOfWeek = appointmentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new Error("Los turnos solo pueden agendarse de lunes a viernes");
}
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const in14Days = new Date(today);
      in14Days.setDate(in14Days.getDate() + 14);
    if (appointmentDate < tomorrow || appointmentDate > in14Days){
        throw new Error("La fecha debe estar entre mañana y los próximos 14 días");
    }
    
    //*Hora
    if(!time) throw new Error ("El campo time es obligatorio");
    const validTimes = [
        "08:00", "08:30", "09:00", "09:30",
        "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00", "19:30",
        "20:00",
        ]
    if (!validTimes.includes(time)){
        throw new Error("El campo time debe estar entre las 8:00 y 20:00 en intervalos de 30 minutos");
    }    
    if (!description)
        throw new Error("El campo description es obligatorio");
    if (typeof description !== "string") throw new Error(
        "El campo description debe ser un string");
    if (description.length < 4 || description.length > 50) {
        throw new Error("El campo description debe tener entre 4 y 50 caracteres");
    }
} catch (error) {
    if (error instanceof Error){
        return res.status(400).json({error: error.message});
    }
}
next();
};
export default validateAppointment;
