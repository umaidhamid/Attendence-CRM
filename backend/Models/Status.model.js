import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    // Attendance type
    status: {
      type: String,
      required: true,
      enum: ["present", "absent", "leave", "late"],
      lowercase: true,
      index: true,
    },

    // Payment type
    payment: {
      type: String,
      required: true,
      enum: ["paid", "unpaid"],
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
statusSchema.index({ status: 1, payment: 1 }, { unique: true });

const Status = mongoose.model("Status", statusSchema);
export default Status;
