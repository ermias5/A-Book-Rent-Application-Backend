import { Router } from "express";
import getUnreadNotifications from "../controllers/adminDashboardController/getUnreadNotifications.js";

const adminRoute = Router();

adminRoute.get("/notifications", getUnreadNotifications);

export default adminRoute;
