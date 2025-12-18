import express from "express";
import {
  createUser,
  setPassword,
  verifyToken,
  loginUser
} from "../Controllers/User.controller.js";
const router = express.Router();
router.post("/create", createUser);
router.get("/login",loginUser)
router.get("/verifyToken", verifyToken);
router.patch("/setpassword", setPassword);
export default router;
