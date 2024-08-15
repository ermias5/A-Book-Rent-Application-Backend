import express from "express";
import userRoute from "./src/routes/userRoute.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoute from "./src/routes/adminDashboardRoute.js";

const PORT = config(process.cwd, ".env").parsed.APP_PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

// const PORT = process.env.APP_PORT || 3000;
app.listen(8080, () => {
  console.log(`app is listing on port ${PORT}`);
});

export default app;
