import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate attendance per user per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });
attendanceSchema.pre("save", function (next) {
  this.date.setHours(0, 0, 0, 0);
  next();
});
const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
