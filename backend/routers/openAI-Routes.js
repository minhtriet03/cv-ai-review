const express = require("express");
const { chatDeepSeek } = require("../controllers/openAI");
const router = express.Router();
const { auth } = require("../middleware/auth");
router.post("/",auth, chatDeepSeek);

module.exports = router;
