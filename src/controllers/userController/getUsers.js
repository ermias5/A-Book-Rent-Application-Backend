import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "OWNER",
        // isApproved: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.send(users);
  } catch (err) {
    res.status(500).json({ err: "Failed to fetch new owners" });
  }
};

export default getUsers;
