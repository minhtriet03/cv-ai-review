const CV = require("../models/cvModel"); // Import model CV

const saveCV = async ({ userId, cvUrl, fileName }) => {
  try {
    const newCV = new CV({ userId, cvUrl, fileName });
    await newCV.save();
    return newCV;
  } catch (error) {
    throw new Error("Lỗi khi lưu CV vào database: " + error.message);
  }
};

module.exports = saveCV;
