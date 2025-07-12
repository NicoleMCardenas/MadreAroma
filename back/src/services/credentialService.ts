import ICreateCredentialDto from "../dtos/ICreateCredentialDto";
import ICredential from "../interfaces/ICredential";
const credentials: ICredential[] = [];
let credentialId: number = 10;

//*Crear nueva credential
export const createCredentialService= async (createCredentialDto: ICreateCredentialDto): Promise <ICredential> => {
    const {username, password} = createCredentialDto;
    const newCredential: ICredential = {
        id: credentialId++,
        username,
        password,
    };
    credentials.push(newCredential);
    return newCredential;
};
//*Validar credentials
export const validateCredentialService = (validateCredentialDto: ICreateCredentialDto) => {
    const {username, password} = validateCredentialDto;
    const foundCredential: ICredential | undefined = credentials.find(credential => credential.username === username)
    if (!foundCredential) throw Error("Credenciales incorrectas");
    if (password !== foundCredential.password){
      throw Error ("Credenciales incorrectas");
}
return foundCredential;
};
