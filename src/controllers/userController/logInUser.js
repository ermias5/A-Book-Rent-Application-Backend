import { PrismaClient } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body.userData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("login user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Password didn't match" });
    }

    const maxAge = 30 * 24 * 60 * 60;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: maxAge,
    });

    res.send({
      user,
      token: token,
      // rules: defineRuleFor(user),
      message: "User created successfully",
    });

    // res.send({
    //   data:user,
    //   token:token,
    //   message:{'wanting login'}
    // })
  } catch (err) {
    console.log(err);
  }
};

export default logInUser;
