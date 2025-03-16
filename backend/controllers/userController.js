const User = require("../models/userModel");
const { registerUser, verifyUserEmail, loginUser } = require("../services/userService");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsersById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id); // Find user by id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    console.log("Received user data:", req.body);
    const response = await registerUser(req.body);
    console.log("RegisterUser response:", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  console.log("📥 Dữ liệu nhận được từ frontend:", req.body);
  try {
    const { email, otp } = req.body;
    const response = await verifyUserEmail(email, otp);
    console.log(email,otp);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    const statusCode = error.status || 500; // Lấy mã lỗi từ createError, mặc định 500
    res.status(statusCode).json({ message: error.message });
  }
};

