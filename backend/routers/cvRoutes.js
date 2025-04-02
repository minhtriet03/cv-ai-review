// backend/routers/cvRoutes.js
const express = require("express");
const { analyzeCV } = require("../controllers/cvAnalyzer");
const router = express.Router();

router.get("/analyze/:cvId", analyzeCV);

module.exports = router;
