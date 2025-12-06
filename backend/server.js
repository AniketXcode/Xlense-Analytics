const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
import cors from "cors";

app.use(cors({
  origin: [
    "https://xlens-alpha.vercel.app",
  ],
  credentials: true,
}));

app.use(express.json());

// Routes Import
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
