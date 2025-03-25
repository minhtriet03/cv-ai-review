const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const createError = require("http-errors");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,  
  secure: true, 
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, 
  },
});


exports.registerUser = async (userData) => {
  try {
    console.log("🔍 registerUser called with:", userData);

    const { name, email, password } = userData;
    console.log("🔍 Checking existing user for email:", email);

    const existingUser = await User.findOne({ email });
    console.log("🔍 Existing user:", existingUser);

    if (existingUser) {
      console.log("❌ User already exists!");
      throw new Error("User already exists");
    }

    console.log("🔍 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully");

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
      profilePicture: null,
      verificationCode,
      verificationExpires,
      isVerified: false,
    });

    await newUser.save();

    await transporter.sendMail({
      from: `"TrietPT" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🔐 Xác thực tài khoản - Hành động cần thiết!",
      text: `Chào bạn, mã xác thực của bạn là ${verificationCode}. Vui lòng nhập mã này để tiếp tục.`,
      replyTo: process.env.GMAIL_USER,  // Thêm replyTo
    });
    
    return { message: "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản." };
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    throw error;  // Ném lỗi để controller xử lý
  }
};
exports.verifyUserEmail = async (email, otp) => {
  console.log("🔍 Kiểm tra email:", email);
  console.log("🔍 Kiểm tra OTP nhận được:", otp);

  const user = await User.findOne({ email });

  if (!user) {
    console.error("❌ User không tồn tại");
    throw new Error("User not found");
  }

  if (user.isVerified) {
    console.warn("⚠️ User đã xác thực trước đó");
    throw new Error("User already verified");
  }

  console.log("📌 OTP trong database:", user.verificationCode);

  if (user.verificationCode.toString() !== otp.toString()) {
    console.error("❌ Mã OTP không chính xác");
    throw new Error("Invalid verification code");
  }

  // Cập nhật trạng thái xác thực
  user.isVerified = true;
  user.verificationCode = ""; // Xóa mã OTP sau khi xác minh
  await user.save();

  console.log("✅ Xác thực thành công!");

  return { message: "Email verified successfully!" };
};


// đăng nhập người dùng
exports.loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw createError(400, "Email và mật khẩu không được để trống");
    }

    // Tìm người dùng theo email
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      console.log("User not found");
      throw createError(404, "Tài khoản không tồn tại");
    }

    // Kiểm tra tài khoản đã xác minh chưa
    if (!user.isVerified) {
      console.log("Account not verified!");
      await User.deleteOne({ email: user.email });
      throw createError(403, "Tài khoản chưa xác minh mã otp vui lòng đăng kí lại");
    }

    // Kiểm tra mật khẩu (nên dùng bcrypt để so sánh)
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      console.log("Password does not match");
      throw createError(401, "Mật khẩu không chính xác");
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful");
    return { user, token };
  } catch (error) {
    throw error;
  }
};


exports.listUsers = async () => {
  const users = await User.find();
  console.log("All users in the database:", users);
};