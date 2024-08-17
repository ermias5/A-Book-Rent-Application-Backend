import { Router } from "express";
import getUsers from "../controllers/userController/getUsers.js";
import updateUser from "../controllers/userController/updateUser.js";
import createUser from "../controllers/userController/createUser.js";
import getUser from "../controllers/userController/getUser.js";
import deleteUser from "../controllers/userController/deleteUser.js";
import logInUser from "../controllers/userController/logInUser.js";
import adminAuthentication from "../middlewares/adminAuthentication.js";

const userRoute = Router();

userRoute.get("/users", adminAuthentication, getUsers);
userRoute.get("/user", getUser);
userRoute.put("/updateOwner", adminAuthentication, updateUser);
userRoute.post("/", createUser);
userRoute.post("/login", logInUser);
userRoute.delete("/user", deleteUser);

export default userRoute;
