const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Thêm bcrypt để mã hóa mật khẩu

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "reviewer", "user"],
      default: "user",
    },
    profilePicture: { type: String },
    verificationCode: { type: String }, // Mã xác thực email
    isVerified: { type: Boolean, default: false }, // Trạng thái xác thực
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Mã hóa mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
  // Chỉ hash mật khẩu nếu nó được thay đổi hoặc là mới
  if (!this.isModified("password")) return next();

  try {
    // Hash mật khẩu với salt factor 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Phương thức so sánh mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", userSchema, "users");
