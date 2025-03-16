const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "reviewer", "user"], default: "user" },
    profilePicture: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    verificationCode: { type: String }, // Mã xác thực email
    isVerified: { type: Boolean, default: false }, // Trạng thái xác thực
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "users");
