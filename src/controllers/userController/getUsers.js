

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (req, res) => {

  const users = await prisma.user.findMany();
  res.send(users);
};

export default getUsers;
