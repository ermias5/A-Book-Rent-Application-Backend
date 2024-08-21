import { Router } from "express";
import createBook from "../controllers/bookController/createBook.js";
import getBook from "../controllers/bookController/getBook.js";

const bookRoute = Router();

bookRoute.post("/create", createBook);
bookRoute.get("/books", getBook);

export default bookRoute;
