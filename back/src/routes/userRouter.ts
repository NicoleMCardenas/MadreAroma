import { Router } from "express";
import {getAllUsers, getUserById, login, register} from "../controllers/userController";

const userRouter = Router();
//*GET/users
userRouter.get("/", getAllUsers)
//*GET/users/:id
userRouter.get("/:id", getUserById)
//*POST/users/register
userRouter.post("/register", register)
//*POST/users/login
userRouter.post("/login", login)

export default userRouter;