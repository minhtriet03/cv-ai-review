const mongoose = require("mongoose");
const { saveCV } = require("../services/cvService");

exports.uploadFile = async (req, res) => {
  try {
    const { userId, cvUrl, fileName } = req.body;

    console.log("📥 Received Data:", { userId, cvUrl, fileName });

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("❌ Invalid userId:", userId);
      return res.status(400).json({ message: "Invalid userId" });
    }

    if (!userId || !cvUrl || !fileName) {
      console.error("❌ Missing required fields:", { userId, cvUrl, fileName });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const savedCV = await saveCV({ userId, cvUrl, fileName });
    res.status(201).json({
      message: "CV uploaded successfully",
      cv: savedCV,
      cvId: savedCV._id,
    });
  } catch (error) {
    console.error("❌ Error uploading CV:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
