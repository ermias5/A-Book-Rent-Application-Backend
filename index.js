import express from "express";
import userRoute from "./src/routes/userRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", userRoute);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listing on port ${PORT}`);
});
