const express = require("express");
const upload = require("../middleware/uploadMiddleware"); // Import middleware
const { uploadFile } = require("../controllers/uploadController");

const router = express.Router();

router.post("/cv", upload.single("file"), uploadFile); // Chắc chắn sử dụng upload.single("file")

module.exports = router;
