const CV = require("../models/cvModel");
const CvService = require("../services/cvService");
const createError = require("http-errors");

// ====== USER: Lấy CV đã đánh giá ======
exports.getEvaluatedCVs = async (req, res) => {
  try {
    const userId = req.user._id;
    const evaluatedCVs = await CV.find({
      userId: userId,
      review: { $exists: true, $ne: null }
    }).sort({ uploadedAt: -1 });
    res.status(200).json(evaluatedCVs);
  } catch (error) {
    console.error("Error fetching evaluated CVs:", error);
    res.status(500).json({ message: "Error fetching evaluated CVs" });
  }
};

// ====== ADMIN: Quản lý CV ======
exports.getCvs = async (req, res, next) => {
  try {
    const cvs = await CvService.getCvs();
    res.status(200).json(cvs);
  } catch (error) {
    next(createError(500, "Lỗi khi lấy danh sách CV"));
  }
};

exports.getCvsbyIdUser = async (req, res, next) => {
  const IdUser = req.params.id;
  try {
    const cvs = await CvService.getByIdUser(IdUser);
    res.status(200).json(cvs);
  } catch (error) {
    next(createError(500, "Lỗi khi lấy danh sách CV"));
    console.log(error);
  }
};

exports.deleteCv = async (req, res, next) => {
  const cvId = req.params.id;
  try {
    const deletedCv = await CvService.deleteCv(cvId);
    if (!deletedCv) {
      return res.status(404).json({ message: "CV không tồn tại" });
    }
    res.status(200).json({ message: "CV đã được xóa thành công" });
  } catch (error) {
    next(createError(500, "Lỗi khi xóa CV"));
  }
};