import jwt from "jsonwebtoken";

const jwtAuthentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "jwt verifay faild" });
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default jwtAuthentication;
