import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const { name } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { name: name },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export default getUser;
