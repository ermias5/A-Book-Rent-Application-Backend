import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { defineRuleFor } from "../../auth/abilities.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const newUser = req.body.usersData;

    const existingUser = await prisma.user.findUnique({
      where: { email: newUser.email },
    });
    if (existingUser) {
      res.status(400).send("account already exists");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const user = await prisma.user.create({
      data: {
        name: newUser?.name,
        email: newUser.email,
        password: hashedPassword,
        role: newUser.role,
        PhoneNumber: newUser.PhoneNumber,
        location: newUser.location,
      },
    });
    console.log(user);

    const maxAge = 30 * 24 * 60 * 60;
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: maxAge,
    });

    // tokenStore[accessToken] = user;

    // res.cookie("jwt", accessToken, {
    //   httpOnly: true,
    // });

    // res.json({ accessToken: accessToken });

    res.send({
      data: user,
      token: accessToken,
      rules: defineRuleFor(user),
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default createUser;
