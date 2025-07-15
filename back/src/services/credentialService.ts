import { CredentialModel } from "../config/data-source";
import ICreateCredentialDto from "../dtos/ICreateCredentialDto";
import { Credential } from "../entities/Credential";

//*Crear nueva credential
export const createCredentialService= async (createCredentialDto: ICreateCredentialDto): Promise <Credential> => {
    const credential: Credential = CredentialModel.create(createCredentialDto);
    await CredentialModel.save(credential);
    return credential;
    };
//*Validar credentials

export const validateCredentialService = async ( dto: ICreateCredentialDto): Promise<Credential> => {
  const credential = await CredentialModel.findOneBy({ username: dto.username });

  if (!credential || credential.password !== dto.password) {
    throw new Error("Credenciales incorrectas");
  }

  return credential;
};