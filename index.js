import express from "express";
import userRoute from "./src/routes/userRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use("/api/user", userRoute);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is listing on port ${PORT}`);
});
