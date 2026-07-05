require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const verifyToken = require("./middleware/authMiddleware");
const authorizeRole = require("./middleware/roleMiddleware");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===========================
   API Routes
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

/* ===========================
   Protected Routes
=========================== */

app.get("/api/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully.",
    user: req.user,
  });
});

app.get(
  "/api/admin",
  verifyToken,
  authorizeRole("Admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin!",
    });
  }
);

app.get(
  "/api/employee",
  verifyToken,
  authorizeRole("Employee"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Employee!",
    });
  }
);

/* ===========================
   Test Database Connection
=========================== */

db.getConnection()
  .then((connection) => {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  })
  .catch((err) => {
    console.log("❌ Database Connection Failed");
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Employee Task Management API Running...",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});