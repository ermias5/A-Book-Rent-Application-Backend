import { Router } from "express";
import createBook from "../controllers/bookController/createBook.js";

const bookRoute = Router();

bookRoute.post("/create", createBook);

export default bookRoute;
