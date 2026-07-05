const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register User
const registerUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      confirmPassword,
      role,
      department,
      designation,
    } = req.body;

    if (
      !full_name ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase and one number.",
      });
    }

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (full_name, email, password, role, department, designation)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        hashedPassword,
        role,
        department,
        designation,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        role: user[0].role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: rememberMe ? "7d" : "1d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user[0].id,
        full_name: user[0].full_name,
        email: user[0].email,
        role: user[0].role,
      },
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
  registerUser,
  loginUser,
};