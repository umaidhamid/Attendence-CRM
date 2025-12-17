import dotenv from "dotenv";
dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS length:",
  process.env.EMAIL_PASS ? process.env.EMAIL_PASS: "MISSING"
);
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./Database/Database.js";
import morgan from "morgan";
import userRouter from "./Routes/user.routes.js";
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("backend is running perfectly");
});
const PORT = process.env.PORT || 5000;
app.use("/create", userRouter);
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
