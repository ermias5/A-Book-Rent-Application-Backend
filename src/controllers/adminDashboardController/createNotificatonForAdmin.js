import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createNotification(userId) {
  const message = `new registration from new owner ID ${userId}`;

  await prisma.notification.create({
    data: {
      userId: userId,
      message: message,
    },
  });
}

export default createNotification;