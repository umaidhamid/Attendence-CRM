import dotenv from "dotenv";
dotenv.config();
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log(
//   "EMAIL_PASS length:",
//   process.env.EMAIL_PASS ? process.env.EMAIL_PASS: "MISSING"
// );
import { authMiddleware } from "./middleware/auth.middleware.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./Database/Database.js";
import morgan from "morgan";
import userRouter from "./Routes/user.routes.js";
connectDB();
const app = express();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.LOCAL_URL
        : process.env.FRONTEND_URL,

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: true, // enable cookies / auth headers
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("backend is running perfectly");
});
const PORT = process.env.PORT || 5000;
app.use("/user", userRouter);

// auth middleware
app.get("/isAuth", authMiddleware, (req, res) => {
  const { role, id } = req.user;
  return res.status(200).json({ data: { role, id } });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
