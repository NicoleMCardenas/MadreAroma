import ICreateAppointmentDto from "../dtos/IScheduleAppointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { appointmentRepository } from "../repositories/indexRepository";
import { getUserByIdService } from "./userService";

//*RETORNA TODAS LAS CITAS
export const getAllAppointmentsService = async ():Promise <Appointment[]> => {
  const allAppointments: Appointment[] = await appointmentRepository.find();
   return allAppointments; 
};

//*OBTIENE LA CITA POR ID
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
  const appointment: Appointment | null = await appointmentRepository.findOneBy({ id });

  if (!appointment) throw Error("Turno no encontrado");
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
  const newAppointment = appointmentRepository.create({
    date,
    time,
    description,
    status: AppointmentStatus.ACTIVE,
    user,
  });
// //*GUARDO ID DEL USUARIO QUE CREÓ EL TURNO 
  await appointmentRepository.save(newAppointment);
  return newAppointment;
}; 

//*CAMBIA EL ESTADO DE LA CITA A CANCELADA
export const cancelAppointmentService = async (id: number): Promise<void> => {
  const appointment: Appointment | null = await appointmentRepository.findOneBy({ id } );

  if (!appointment) {
    throw Error(`No existe turno con id: ${id}$`);
  }

  appointment.status = AppointmentStatus.CANCELLED;
  await appointmentRepository.save(appointment);

  return;
};