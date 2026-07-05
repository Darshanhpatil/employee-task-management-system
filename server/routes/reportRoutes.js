const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
  getReports,
} = require("../controllers/reportController");

router.get(
  "/",
  verifyToken,
  authorizeRole("Admin"),
  getReports
);

module.exports = router;