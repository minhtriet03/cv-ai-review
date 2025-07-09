// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: [".env.local", ".env"] });
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Security headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser()); // Parse cookies
app.set('trust proxy', 1);

// CORS configuration
app.use(cors({
  origin:'http://review.sao789a.site', // Frontend URL
  credentials: true, // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("âœ… MongoDB Connected")
    console.log(`âœ… Connected to database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => console.error("âŒ MongoDB Connection Error:", err));

// Routes
console.log("ðŸ” OpenAI API URL:", process.env.OPENAI_API_URL);
console.log(
  "ðŸ” OpenAI API Key:",
  process.env.OPENAI_API_KEY ? "âœ… Loaded" : "âŒ Not found"
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
const cvRouter = require("./routers/cvRouter");
app.use("/api/cv", cvRouter);
app.use("/evaluated-cvs", cvRouter);

const cvRoutes = require("./routers/cvRoutes");
app.use("/api/cv", cvRoutes);

const dashboardRoutes = require("./routers/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// Simple API to check server
app.get("/", (req, res) => {
  res.send("ðŸŽ‰ Backend is running!");
});

app.listen(PORT, () => {
  console.log(`ðŸš€ Server is running on port ${PORT}`);
});

