import ICreateAppointmentDto from "../dtos/ICreateAppointmentDto";
import IAppointment, {AppointmentStatus} from "../interfaces/IAppointment";
import { getUserByIdService } from "./userService";


//*BDD SIMULADA
const appointments: IAppointment[] = [
  {
    id: 1,
    date: "2025-07-12",
    time: "10:00",
    status: AppointmentStatus.ACTIVE,
    description: "Recoger paquete",
    userId: 1
  },
  {
    id: 2,
    date: "2025-07-15",
    time: "14:30",
    status: AppointmentStatus.ACTIVE,
    description: "Molido",
    userId: 2
  }
];
let nextId = 3
//*RETORNA TODAS LAS CITAS
export const getAllAppointmentsService = async (): Promise <IAppointment[]> => {
    return appointments;
};
//*OBTIENE LA CITA POR ID
export const getAppointmentByIdService = async (id: number): Promise<IAppointment> => {
  const appointment = appointments.find(appointment => appointment.id === id);
  if (!appointment) throw new Error("Cita no encontrada");
  return appointment;
};
//*CREAR NUEVA CITA, GUARDARLA CON ID DEL USUARIO QUE LA CREÓ
export const scheduleAppointmentService = async (createAppointment: ICreateAppointmentDto) => {
    const {date,time,description,userId} = createAppointment
  //*NO PUEDE HABER UN TURNO SIN ID DEL USUARIO(SI EL USUARIO NO EXISTE)
    const user = await getUserByIdService(createAppointment.userId);
  if (!user) throw new Error("Usuario no válido");
//*NUEVA CITA
  const newAppointment: IAppointment= {
    id: nextId++, date, time, description,
    status: AppointmentStatus.ACTIVE,
// //*GUARDO ID DEL USUARIO QUE CREÓ EL TURNO 
    userId: createAppointment.userId
  };

  appointments.push(newAppointment);
  return newAppointment;
};
//*CAMBIA EL ESTADO DE LA CITA A CANCELADA
export const cancelAppointmentService = async (id: number): Promise<IAppointment> => {
  const appointment = appointments.find(appointment => appointment.id === id);
  if (!appointment) throw new Error("Cita no encontrada");

  appointment.status = AppointmentStatus.CANCELLED;
  return appointment;
};