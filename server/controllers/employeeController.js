const bcrypt = require("bcrypt");
const db = require("../config/db");

// ============================
// Get All Employees
// ============================
const getEmployees = async (req, res) => {
  try {
    let {
      search = "",
      page = 1,
      limit = 5,
      sort = "full_name",
      order = "ASC",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const allowedSortFields = [
      "full_name",
      "email",
      "department",
      "designation",
      "created_at",
    ];

    if (!allowedSortFields.includes(sort)) {
      sort = "full_name";
    }

    order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const offset = (page - 1) * limit;

    const [employees] = await db.query(
      `SELECT id, full_name, email, role, department, designation
       FROM users
       WHERE role = 'Employee'
       AND (
          full_name LIKE ?
          OR email LIKE ?
          OR department LIKE ?
          OR designation LIKE ?
       )
       ORDER BY ${sort} ${order}
       LIMIT ? OFFSET ?`,
      [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        limit,
        offset,
      ]
    );

    const [count] = await db.query(
      `SELECT COUNT(*) AS total
       FROM users
       WHERE role='Employee'
       AND (
          full_name LIKE ?
          OR email LIKE ?
          OR department LIKE ?
          OR designation LIKE ?
       )`,
      [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
      ]
    );

    res.status(200).json({
      success: true,
      totalEmployees: count[0].total,
      currentPage: page,
      totalPages: Math.ceil(count[0].total / limit),
      employees,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// Add Employee
// ============================
const addEmployee = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      department,
      designation,
    } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (full_name,email,password,role,department,designation)
      VALUES(?,?,?,?,?,?)`,
      [
        full_name,
        email,
        hashedPassword,
        "Employee",
        department,
        designation,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Employee added successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// Update Employee
// ============================
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      full_name,
      email,
      department,
      designation,
    } = req.body;

    await db.query(
      `UPDATE users
       SET
       full_name=?,
       email=?,
       department=?,
       designation=?
       WHERE id=?`,
      [
        full_name,
        email,
        department,
        designation,
        id,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// Delete Employee
// ============================
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};