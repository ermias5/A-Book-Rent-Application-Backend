import { Router } from "express";
import createBook from "../controllers/bookController/createBook.js";
import getBook from "../controllers/bookController/getBooks.js";
import getOwnerBooks from "../controllers/bookController/getOwnerBooks.js";
import upload from "../config/multerConfig.js";

const bookRoute = Router();

bookRoute.post("/create", upload.single("bookCoverImage"), createBook);
bookRoute.get("/books", getBook);
bookRoute.get("/books/:ownerId", getOwnerBooks);

export default bookRoute;
