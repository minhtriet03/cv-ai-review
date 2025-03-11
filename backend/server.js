require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected")
    console.log(`✅ Connected to database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
const userRoutes = require("./routers/userRoutes");
app.use("/api", userRoutes);

// Simple API to check server
app.get("/", (req, res) => {
  res.send("🎉 Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
