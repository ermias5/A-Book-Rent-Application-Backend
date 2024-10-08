import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { name, email, password, PhoneNumber, location } = req.body.usersData;

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
        message: "Account already exist! please log in",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        PhoneNumber,
        location,
        email,
        password: hashedPassword,
      },
    });

    const maxAge = 30 * 24 * 60 * 60;
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, name: user.name, role: user.role },
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
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({ message: "user not created" });
    console.log(err.message);
  }
};

export default createUser;
