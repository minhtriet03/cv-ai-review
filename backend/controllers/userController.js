const User = require("../models/userModel");
const {
  registerUser,
  verifyUserEmail,
  loginUser,
} = require("../services/userService");
const { sendPasswordResetEmail } = require("../services/emailService");
const crypto = require("crypto");
const createError = require("http-errors");
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() }); // Find user by email
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
    console.log(email, otp);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Gọi hàm xử lý đăng nhập và lấy user + token
    const { user, token } = await loginUser(email, password);

    // Gửi token vào cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true nếu dùng HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 ngày
    });
    
    // Trả response (không cần trả token nữa)
    res.status(200).json({ user });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token không đúng hoặc đã hết hạn" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Mật khẩu đã được đặt lại" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thay đổi mật khẩu cho người dùng đã đăng nhập
exports.changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    // Tìm người dùng theo ID
    const user = await User.findById(userId);
    console.log("tên người dùng: ", user.name);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const hashed = await bcrypt.hash(currentPassword, 10);
    console.log('currentPassword:', currentPassword);
    console.log('Hash thử:', hashed);
    console.log('Hash trong DB:', user.password);
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      console.log("Hashed password in DB:", user.password);
      console.log("password:", currentPassword);
      console.log("Password does not match");
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    // Cập nhật mật khẩu mới
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (err) {
    console.log("Lỗi khi thay đổi mật khẩu:", err);
    res.status(500).json({ message: err.message });
  }
};

// upload image
exports.updateProfilePicture = async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;
    console.log("📥 Data received:", req.body);
    // Kiểm tra dữ liệu đầu vào
    if (!userId || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Cập nhật ảnh đại diện trong database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true } // Trả về user đã được cập nhật
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile picture updated!",
      user: updatedUser,
    });
    console.log("✅ Updated user:", updatedUser);
  } catch (error) {
    console.error("❌ Error updating profile picture:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    // Xóa cookie có cùng options như lúc set (để xoá đúng)
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // để false nếu chạy localhost
      sameSite: "Lax", // phải khớp sameSite khi set
    });

    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error("❌ Lỗi khi đăng xuất:", error);
    return res.status(500).json({ message: "Đăng xuất thất bại" });
  }
};

// Controller admin

// Lấy danh sách tất cả người dùng
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log("User: ",users);
        res.status(200).json(users);
    } catch (error) {
        next(createError(500, "Lỗi khi lấy danh sách người dùng"));
    }
};

// Lấy thông tin chi tiết của một người dùng
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, "Người dùng không tồn tại"));
        }
        res.status(200).json(user);
    } catch (error) {
        next(createError(500, "Lỗi khi lấy thông tin người dùng"));
    }
};

// Tạo người dùng mới
exports.createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(createError(500, "Lỗi khi tạo người dùng"));
    }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return next(createError(404, "Người dùng không tồn tại"));
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(createError(500, "Lỗi khi cập nhật người dùng"));
    }
};

exports.updateName = async (req, res, next) => {
    try {
      console.log(req.body._id);
        const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body, { new: true });
        console.log(updatedUser);
        if (!updatedUser) {
            return next(createError(404, "Người dùng không tồn tại"));
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(createError(500, "Lỗi khi cập nhật tên người dùng"));
        console.log(error);
    }
}
exports.blockUser = async (req, res, next) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true }); 
        if (!updated) {
            return next(createError(404, "Người dùng không tồn tại"));
        }
        res.status(200).json({ message: "Khóa người dùng thành công" });
    } catch (error) {
        console.log(error);
        next(createError(500, "Lỗi khi khóa người dùng"));  
    }
}
// Mở khóa người dùng
exports.unblockUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true });
        if (!updatedUser) {
            return next(createError(404, "Người dùng không tồn tại"));
        }
        res.status(200).json({ message: "Mở khóa người dùng thành công" });
    } catch (error) {
        next(createError(500, "Lỗi khi mở khóa người dùng"));
    }
};
// Xóa người dùng
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return next(createError(404, "Người dùng không tồn tại"));
        }
        res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (error) {
        next(createError(500, "Lỗi khi xóa người dùng"));
    }
};
