const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// đăng ký người dùng
exports.registerUser = async (userData) => {
  const { name, email, password, role, profilePicture } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create new user
  const user = new User({
    name,
    email,
    password, // Store plain text password
    role,
    profilePicture,
  });

  await user.save();
  return user;
};

// đăng nhập người dùng
exports.loginUser = async (email, password) => {
  console.log(`Login attempt with email: ${email} and password: ${password}`);

  // List all users for debugging
  await exports.listUsers();

  // Check if user exists
  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    console.log("User not found");
    console.log(`Email entered: |${email}|`);
    console.log(`Emails in database: ${await User.distinct("email")}`);
    throw new Error("Invalid email or password");
  }

  // Check if password is correct
  if (password !== user.password) {
    console.log("Password does not match");
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  console.log("Login successful");
  return { user, token };
};


exports.listUsers = async () => {
  const users = await User.find();
  console.log("All users in the database:", users);
};