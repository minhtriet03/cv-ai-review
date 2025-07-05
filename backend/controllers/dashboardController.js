const CV = require("../models/cvModel");
const User = require("../models/userModel");

exports.getDashboardStats = async (req, res) => {
  try {
    // CV đã đánh giá
    const evaluatedCVs = await CV.find({ review: { $exists: true, $ne: null } });
    const totalEvaluatedCVs = evaluatedCVs.length;

    // Thống kê CV đã đánh giá theo ngày
    const cvByDate = {};
    evaluatedCVs.forEach(cv => {
      const date = cv.updatedAt ? cv.updatedAt.toISOString().split('T')[0] : cv.uploadedAt.toISOString().split('T')[0];
      cvByDate[date] = (cvByDate[date] || 0) + 1;
    });

    // User
    const users = await User.find();
    const totalUsers = users.length;

    // Thống kê user đăng ký theo ngày
    const userByDate = {};
    users.forEach(user => {
      const date = user.createdAt.toISOString().split('T')[0];
      userByDate[date] = (userByDate[date] || 0) + 1;
    });

    res.json({
      totalEvaluatedCVs,
      cvByDate,
      totalUsers,
      userByDate,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
}; 