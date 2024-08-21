import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOwnerBooks = async (req, res) => {
  const { ownerId } = req.params;
  console.log("owner id", ownerId);

  try {
    const ownerBooks = await prisma.book.findMany({
      where: {
        ownerId: parseInt(ownerId),
      },
    });
    console.log("ownerBooks", ownerBooks);
    res.status(200).json(ownerBooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};
export default getOwnerBooks;
