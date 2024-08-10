import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const user = await prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        role: newUser.role,
      },
    });

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });

    res.send({
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default createUser;
