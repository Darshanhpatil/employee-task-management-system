const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.get(
  "/",
  verifyToken,
  authorizeRole("Admin"),
  getEmployees
);

router.post(
  "/",
  verifyToken,
  authorizeRole("Admin"),
  addEmployee
);

router.put(
  "/:id",
  verifyToken,
  authorizeRole("Admin"),
  updateEmployee
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRole("Admin"),
  deleteEmployee
);

module.exports = router;