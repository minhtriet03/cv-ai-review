const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getCvs,
  getCvsbyIdUser,
  deleteCv,
  getEvaluatedCVs,
} = require("../controllers/cvController");

// ... existing routes ...

// Route để lấy danh sách CV đã được đánh giá
router.get("/evaluated-cvs", auth, getEvaluatedCVs);
router.get("/cvs",auth, getCvs);
router.get("/cvs/:id",auth , getCvsbyIdUser);
router.delete("/cvs/delete/:id",auth, deleteCv);

module.exports = router; 