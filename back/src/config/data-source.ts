import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Appointment } from "../entities/Appointment"
import { Credential } from "../entities/Credential"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs"

const isProd = process.env.NODE_ENV === "production";
const syncOnce = process.env.SYNC_SCHEMA_ONCE === "true";

export const AppDataSource = new DataSource({
    type: "postgres",
    ...(process.env.DATABASE_URL
    ? {
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
    host: DB_HOST,
    port: Number (DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
        }),
    synchronize: !isProd || syncOnce, //*ETAPA
    dropSchema: false, //*DEV, AL FINALIZAR CAMBIAR A FALSE
    logging: false,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
});
