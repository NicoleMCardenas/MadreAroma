
import ICreateCredentialDto from "../dtos/ICreateCredentialDto";
import { Credential } from "../entities/Credential";
import { credentialRepository } from "../repositories/indexRepository";

//*Crear nueva credential
export const createCredentialService= async (createCredentialDto: ICreateCredentialDto): 
  Promise <Credential> => {
       const {username, password} = createCredentialDto;
//*Validar que no exista la credencial      
       const foundCredential: Credential | null =
      await credentialRepository.findOneBy({username});
    if(foundCredential) throw Error (`Ya existe credencial con el nombre ${username}`);
//*Crear credencial
       const newCredential: Credential = credentialRepository.create({
        username,
        password,
       });
//*Guardar credencial en BDD       
      await credentialRepository.save(newCredential);
      return newCredential;
    };
//*VALIDAR CREDENCIALES
export const validateCredentialService = async ( validateCredentialDto: ICreateCredentialDto): 
  Promise<number> => {
       const {username, password} = validateCredentialDto;
//*Verificar que exista la credencial       
       const foundCredential: Credential| null = await credentialRepository.findOneBy({ username});
//*Verificar password
    if (!foundCredential)
     throw Error("Credenciales incorrectas");  
    if (password!== foundCredential.password) 
     throw Error("Credenciales incorrectas");
  
      return foundCredential.id;
};