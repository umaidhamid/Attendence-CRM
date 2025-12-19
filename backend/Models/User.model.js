import mongoose from "mongoose";
const UserScheme = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  type: String,
  enum: ["admin", "employee"],
  default: "employee",
  passwordSetupToken: { type: String },
  passwordSetupExpires: Date,
});
const User = mongoose.model("User", UserScheme);
export default User;
