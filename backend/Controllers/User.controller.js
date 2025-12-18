import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.model.js";
import nodemailer from "nodemailer";

export const createUser = async (req, res) => {
  try {
    const { userName, email, role } = req.body;

    // 1. Validation
    if (!userName || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Generate temporary password & token
    const tempPassword = crypto.randomBytes(6).toString("hex");
    const passwordSetupToken = crypto.randomBytes(20).toString("hex");

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // 5. Create user
    const newUser = await User.create({
      userName,
      email,
      role,
      password: hashedPassword,
      passwordSetupToken,
      passwordSetupExpires: Date.now() + 30 * 60 * 1000,
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const resetUrl = `${process.env.FRONTEND_URL}/set-password?email=${email}&token=${passwordSetupToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Set your password",
      html: `
    <h3>Welcome to Attendance System</h3>
    <p>Click the link below to set your password:</p>
    <a href="${resetUrl}">Set Password</a>
    <p>This link will expire in 30 minutes.</p>
  `,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
        url: resetUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { email, token } = req.query;

    // 1. Validate input
    if (!email || !token) {
      return res.status(400).json({
        success: false,
        message: "Email and token are required",
      });
    }

    // 2. Find user with valid token
    const user = await User.findOne({
      email,
      passwordSetupToken: token,
      passwordSetupExpires: { $gt: Date.now() },
    });

    // 3. If user not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired link",
      });
    }

    // 4. Token is valid
    return res.status(200).json({
      success: true,
      token: token,
      userName: user.userName,
      message: "Token is valid",
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const setPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;

    // 1. Validate input
    if (!email || !token || !password) {
      return res.status(400).json({
        message: "Email, token, and password are required",
      });
    }

    // 2. Find user with valid token
    const user = await User.findOne({
      email,
      passwordSetupToken: token,
      passwordSetupExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Update user securely
    user.password = hashedPassword;
    user.passwordSetupToken = undefined;
    user.passwordSetupExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
