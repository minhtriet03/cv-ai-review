const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user
    cvUrl: { type: String, required: true }, // URL of the uploaded CV
    fileName: { type: String, required: true }, // Name of the uploaded file
    content: { type: String }, // Nội dung của CV được đọc
    review: { type: String }, // Đánh giá CV của AI và người dùng
    status: { type: String, default: "pending" }, // Trạng thái của CV (pending, approved, rejected)
    uploadedAt: { type: Date, default: Date.now }, // Timestamp of when the CV was uploaded
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("CV", cvSchema, "cvs");
