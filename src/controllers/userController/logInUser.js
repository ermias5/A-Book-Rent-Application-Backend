import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body.usersData;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      user.token = token;

      const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        // httpOnly: true,
      };
      res.cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default logInUser;
