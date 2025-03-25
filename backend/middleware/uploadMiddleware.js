const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cv-ai-review",
    resource_type: "raw", // Dành cho file PDF, DOC, DOCX
    format: async (req, file) => file.mimetype.split("/")[1], // Lấy format từ file upload
  },
});

const upload = multer({ storage });

module.exports = upload;
