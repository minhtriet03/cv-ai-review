// backend/routers/cvRoutes.js
const express = require("express");
const { analyzeCV } = require("../controllers/cvAnalyzer");
const router = express.Router();
const { auth } = require("../middleware/auth"); 
router.get("/analyze/:cvId",auth, analyzeCV);

module.exports = router;
