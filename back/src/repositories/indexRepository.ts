import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";

export const credentialRepository = AppDataSource.getRepository(Credential);
export const appointmentRepository= AppDataSource.getRepository(Appointment);
export const userRepository = AppDataSource.getRepository(User);