
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBook = async (req, res) => {
  try {
    const { bookData } = req.body;
    const parsedBookData = JSON.parse(bookData);
    const { title, author, category, price, bookQuantity, user } =
      parsedBookData;
    const bookCoverImage = req.file ? req.file.filename : null;

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        category,
        price: parseFloat(price),
        quantity: parseInt(bookQuantity),
        imageUrl: bookCoverImage,
        owner: {
          connect: { id: user.id },
        },
      },
      include: {
        owner: true,
      },
    });

    return res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Book not created" });
  }
};

export default createBook;
