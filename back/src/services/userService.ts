import ICreateUserDto from "../dtos/ICreateUserDto";
import IUser from "../interfaces/IUser";
import { createCredentialService } from "./credentialService";
const users: IUser[] = [
  {
    id: 1,
    name: "Laura González",
    email: "laura.gonzalez@example.com",
    birthdate: "1990-05-21",
    nDni: 45678901,
    credentialsId: 101
  },
  {
    id: 2,
    name: "Carlos Pérez",
    email: "carlos.perez@example.com",
    birthdate: "1985-11-15",
    nDni: 32876543,
    credentialsId: 102
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    email: "ana.rodriguez@example.com",
    birthdate: "1993-03-08",
    nDni: 40987654,
    credentialsId: 103
  },
  {
    id: 4,
    name: "Javier Méndez",
    email: "javier.mendez@example.com",
    birthdate: "1978-12-02",
    nDni: 29874561,
    credentialsId: 104
  },
  {
    id: 5,
    name: "Mariana Torres",
    email: "mariana.torres@example.com",
    birthdate: "2000-07-19",
    nDni: 51789320,
    credentialsId: 105
  }
];
let id: number = 10;

export const getAllUsersService= async () => {
    const allUsers: IUser[] = users;
    return allUsers;
};

export const getUserByIdService = async (id: number) => {
const user: IUser | undefined = users.find (user => user.id === id);
if (!user) throw Error ("Usuario no encontrado");
return user;
}
export const createUserService = async (createUserDto: ICreateUserDto): Promise <IUser> => {
const {name, email, birthdate, nDni, username, password} = createUserDto;
//*Crear Credencial
const newCredential = await createCredentialService({username, password});
//*{username, password, id}
console.log(newCredential);
//*Crear Usuario
const newUser: IUser = {
  id: id++,
  name,
  email,
  birthdate,
  nDni,
  credentialsId: newCredential.id,
}
users.push(newUser);
return newUser;
}
export const findUserByCredentialId = async (credentialId: number) =>{
  const user: IUser | undefined = users.find(user => user.id === credentialId);
  return user;
};