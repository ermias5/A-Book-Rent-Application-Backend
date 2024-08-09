import { Router } from "express";
import getUsers from "../controllers/userController/getUsers.js";
import updateUser from "../controllers/userController/updateUser.js";

const userRoute = Router();

userRoute.get("/", getUsers);
userRoute.put("/", updateUser);

export default userRoute;
