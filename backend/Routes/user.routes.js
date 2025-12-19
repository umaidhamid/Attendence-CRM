import express from "express";
import {
  createUser,
  setPassword,
  verifyToken,
  loginUser,
  getData,
} from "../Controllers/User.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/create", createUser);
router.get("/login", loginUser);
router.get("/verifyToken", verifyToken);
router.patch("/setpassword", setPassword);
router.get("/getCurrentUserdata", authMiddleware, getData);
export default router;
