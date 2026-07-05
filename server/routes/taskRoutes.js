const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Admin Create Task
router.post(
  "/",
  verifyToken,
  authorizeRole("Admin"),
  upload.single("attachment"),
  createTask
);

// Admin & Employee View Tasks
router.get("/", verifyToken, getTasks);

// Single Task
router.get("/:id", verifyToken, getTaskById);

// Update Task
router.put(
  "/:id",
  verifyToken,
  upload.single("attachment"),
  updateTask
);

// Delete Task
router.delete(
  "/:id",
  verifyToken,
  authorizeRole("Admin"),
  deleteTask
);

module.exports = router;