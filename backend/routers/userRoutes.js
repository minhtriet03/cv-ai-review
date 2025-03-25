const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getUsers);
router.get("/users/email/:email", userController.getUserByEmail);
router.post("/register", userController.register);
router.post("/verify-email", userController.verifyEmail);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
router.post("/update-profile-picture", userController.updateProfilePicture);
module.exports = router;
