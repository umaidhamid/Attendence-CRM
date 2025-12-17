import express from "express";
import { createUser, verifyToken } from "../Controllers/User.controller.js";
const router = express.Router();
router.post("/user", createUser);
router.get("/verifyToken", verifyToken);
export default router;
