import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { defineRuleFor } from "../../auth/abilities.js";
import createNotification from "../adminDashboardController/createNotificatonForAdmin.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { email, password, PhoneNumber, location } = req.body.usersData;

    if (!email || !password) {
      return res.json({
        message: "Missing required fields",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        PhoneNumber,
        location,
        email,
        password: hashedPassword,
      },
    });

    await createNotification(user.id);

    const maxAge = 30 * 24 * 60 * 60;
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: maxAge,
      }
    );

    res.send({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: accessToken,
      // rules: defineRuleFor(user),
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default createUser;
