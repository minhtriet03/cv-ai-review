const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth } = require("../middleware/auth"); 

router.get("/users", userController.getUsers);
router.get("/users/email/:email", userController.getUserByEmail);
router.post("/register", userController.register);
router.post("/verify-email", userController.verifyEmail);
router.post("/login", userController.login);
router.post("/forgot-password",  userController.forgotPassword);
router.post("/reset-password",  userController.resetPassword);
router.post("/change-password", userController.changePassword);
router.post("/update-profile-picture", auth, userController.updateProfilePicture);
router.post("/logout", userController.logoutUser);
router.post("/update-name", userController.updateName);
// Router Admin
router.get("/users",auth, userController.getUsers); // Lấy danh sách người dùng
router.get("/users/:id",auth, userController.getUserById); // Lấy chi tiết 1 user
router.post("/users",auth, userController.createUser); // Tạo user mới
router.put("/users/:id",auth, userController.updateUser); // Cập nhật user
router.delete("/users/:id", auth,userController.deleteUser); // Xóa user
router.put("/users/:id/block", auth,userController.blockUser); // Khóa user
router.put("/users/:id/unblock", auth,userController.unblockUser); // Mở khóa user
module.exports = router;
