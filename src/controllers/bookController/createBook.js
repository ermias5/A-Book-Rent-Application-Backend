// import prisma from "../../../prisma/prismaClient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBook = async (req, res) => {
  try {
    const book = req.body.bookData;
    const { title, author, category, price, bookQuantity, user } = book;
    console.log("all data", book);
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        category,
        price: parseFloat(price),
        quantity: parseInt(bookQuantity),
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "book not created" });
  }
};

export default createBook;
