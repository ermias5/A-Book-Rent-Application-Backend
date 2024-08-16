import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUnreadNotifications(req, res) {
  if (req.method === "GET") {
    const notifications = await prisma.notification.findMany({
      where: { isRead: false },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(notifications);
  }
}

export default getUnreadNotifications;
