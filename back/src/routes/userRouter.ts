import { Router } from "express";
import {getAllUsers, getUserById, login, register} from "../controllers/userController";
import validateUser from "../middlewares/validateUserMiddleware";
import validateCredential from "../middlewares/validateCredentialMiddleware";

const userRouter = Router();
//*GET/users
userRouter.get("/", getAllUsers);
//*GET/users/:id
userRouter.get("/:id", getUserById);
//*POST/users/register
userRouter.post("/register", validateUser, register);
//*POST/users/login
userRouter.post("/login", validateCredential, login);

export default userRouter;