// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: [".env.local", ".env"] });
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected")
    console.log(`✅ Connected to database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
console.log("🔍 OpenAI API URL:", process.env.OPENAI_API_URL);
console.log(
  "🔍 OpenAI API Key:",
  process.env.OPENAI_API_KEY ? "✅ Loaded" : "❌ Not found"
);
const userRoutes = require("./routers/userRoutes");
app.use("/api", userRoutes);
app.use("/api/user", userRoutes);

const uploadRoutes = require("./routers/uploadRoutes"); 
app.use("/api/upload", uploadRoutes); 

// Router AI OpenAI
const chatRoutes = require("./routers/openAI-Routes");
app.use("/api/deepseek", chatRoutes);

// Router AI Review CV
const cvRoutes = require("./routers/cvRoutes");
app.use("/api/cv", cvRoutes);

// Simple API to check server
app.get("/", (req, res) => {
  res.send("🎉 Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

