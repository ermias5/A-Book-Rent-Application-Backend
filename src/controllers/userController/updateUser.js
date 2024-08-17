import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (req, res) => {
  const { ownerId } = req.body;
  try {
    const updatedOwner = await prisma.user.update({
      where: { id: ownerId },
      data: { isApproved: true },
    });
    console.log("updatedOwner", updatedOwner);
    res.send(updatedOwner);
  } catch (err) {
    console.log(err.message);
  }
};

export default updateUser;
