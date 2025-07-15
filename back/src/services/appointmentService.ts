import { AppointmentModel } from "../config/data-source";
import ICreateAppointmentDto from "../dtos/IScheduleAppointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { getUserByIdService } from "./userService";

//*RETORNA TODAS LAS CITAS
export const getAllAppointmentsService = async ():Promise <Appointment[]> => {
  const allAppointments= await AppointmentModel.find();
   return allAppointments; 
};

//*OBTIENE LA CITA POR ID
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
  const appointment = await AppointmentModel.findOne({ where: { id }, relations:["user"] });

  if (!appointment) throw new Error("Turno no encontrado");
  return appointment;
};
//*CREAR NUEVA CITA, GUARDARLA CON ID DEL USUARIO QUE LA CREÓ
export const scheduleAppointmentService = async (
  createAppointment: ICreateAppointmentDto): Promise<Appointment> => {
  const { date, time, description, userId } = createAppointment;

  //*NO PUEDE HABER UN TURNO SIN ID DEL USUARIO(SI EL USUARIO NO EXISTE)
  const user = await getUserByIdService(userId);
  if (!user) throw new Error("Usuario no válido");

  //*NUEVA CITA
  const newAppointment = AppointmentModel.create({
    date,
    time,
    description,
    status: AppointmentStatus.ACTIVE,
    user,
  });
// //*GUARDO ID DEL USUARIO QUE CREÓ EL TURNO 
  await AppointmentModel.save(newAppointment);
  return newAppointment;
}; 

//*CAMBIA EL ESTADO DE LA CITA A CANCELADA
export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
  const appointment = await AppointmentModel.findOneBy({ id } );

  if (!appointment) {
    throw new Error("Cita no encontrada");
  }

  appointment.status = AppointmentStatus.CANCELLED;
  await AppointmentModel.save(appointment);

  return appointment;
};