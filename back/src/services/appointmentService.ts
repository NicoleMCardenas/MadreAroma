import IScheduleAppointmentDto from "../dtos/IScheduleAppointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { User } from "../entities/User";
import { appointmentRepository, userRepository } from "../repositories/indexRepository";
import { getUserByIdService } from "./userService";

//*RETORNA TODAS LAS CITAS
export const getAllAppointmentsService = async ():Promise <Appointment[]> => {
  const allAppointments: Appointment[] = await appointmentRepository.find();
   return allAppointments; 
};

//*OBTIENE LA CITA POR ID
export const getAppointmentByIdService = async (turnId: number): Promise<Appointment> => {
  const appointment: Appointment | null = await appointmentRepository.findOneBy({ id: turnId});

  if (!appointment) throw Error("Turno no encontrado");
  return appointment;
};
//*CREAR NUEVA CITA, GUARDARLA CON ID DEL USUARIO QUE LA CREÓ
export const scheduleAppointmentService = async (
  scheduleAppointmentDto: IScheduleAppointmentDto): Promise<Appointment> => {
  const { date, time, description, userId } = scheduleAppointmentDto;
//*VERIFICAR QUE EXISTA EL USUARIO
  const user: User| null = await userRepository.findOneBy({ id: userId}); 
 if (!user) throw Error(`No existe usuario con id: ${userId}`);

  //*CREAR NUEVO TURNO
  const newAppointment: Appointment = appointmentRepository.create({
    date, time, description
  });
// //*ASOCIAR EL USUARIO AL TURNO CREADO
newAppointment.user = user;
//GUARDAR EL TURNO CREADO EN BDD
  await appointmentRepository.save(newAppointment);
  return newAppointment;
}; 

//*CAMBIA EL ESTADO DE LA CITA A CANCELADA
export const cancelAppointmentService = async (turnId: number): Promise<void> => {
  const appointment: Appointment | null = await appointmentRepository.findOneBy({ id: turnId });

  if (!appointment) throw Error(`No existe turno con id: ${turnId}`);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0, 0, 0, 0);

  if (appointmentDate <= today) {
    throw new Error("El turno solo puede cancelarse hasta el día anterior a la cita");
  }

  appointment.status = AppointmentStatus.CANCELLED;
  await appointmentRepository.save(appointment);
  return;
};