import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (books) {
      res.json(books);
    } else {
      res.status(404).json({ error: "books not found" });
      return;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
    return;
  }
};

export default getBooks;
