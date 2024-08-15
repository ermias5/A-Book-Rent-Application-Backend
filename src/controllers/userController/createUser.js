import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { defineRuleFor } from "../../auth/abilities.js";
import createNotification from "../../utils/createNoteficationForAdmin.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body.usersData;

    if (!email || !password) {
      return res.json({
        message: "Missing required fields",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).send("account already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        // name: newUser?.name,
        // email: newUser.email,
        // password: hashedPassword,
        // role: newUser.role,
        // PhoneNumber: newUser.PhoneNumber,
        // location: newUser.location,

        email,
        password: hashedPassword,
        // role,
        // PhoneNumber,
        // location,
      },
    });

    await createNotification(user.id);

    const maxAge = 30 * 24 * 60 * 60;
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: maxAge,
    });

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
