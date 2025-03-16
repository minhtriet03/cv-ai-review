const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUsersById);
router.post("/register", userController.register);
router.post("/verify-email", userController.verifyEmail);
router.post("/login", userController.login);

module.exports = router;
