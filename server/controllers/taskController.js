const db = require("../config/db");

// ==============================
// Create Task
// ==============================
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      start_date,
      due_date,
      employee_id,
    } = req.body;

    // Validation
    if (
      !title ||
      !priority ||
      !status ||
      !start_date ||
      !due_date ||
      !employee_id
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (new Date(due_date) < new Date(start_date)) {
      return res.status(400).json({
        success: false,
        message: "Due Date cannot be earlier than Start Date.",
      });
    }

    const attachment = req.file ? req.file.filename : null;

    await db.query(
      `INSERT INTO tasks
      (
        title,
        description,
        priority,
        status,
        start_date,
        due_date,
        attachment,
        employee_id,
        created_by
      )
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        title,
        description,
        priority,
        status,
        start_date,
        due_date,
        attachment,
        employee_id,
        req.user.id,
      ]
    );

    // Notification
    await db.query(
      `INSERT INTO notifications (user_id,message)
       VALUES (?,?)`,
      [
        employee_id,
        `You have been assigned a new task: ${title}`,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get Tasks
// ==============================
const getTasks = async (req, res) => {
  try {
    let query = `
      SELECT
      tasks.*,
      users.full_name
      FROM tasks
      JOIN users
      ON tasks.employee_id = users.id
    `;

    let params = [];

    if (req.user.role === "Employee") {
      query += " WHERE employee_id = ?";
      params.push(req.user.id);
    }

    query += " ORDER BY due_date ASC";

    const [tasks] = await db.query(query, params);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get Single Task
// ==============================
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const [task] = await db.query(
      `SELECT * FROM tasks WHERE id=?`,
      [id]
    );

    if (task.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      task: task[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Update Task
// ==============================
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      priority,
      status,
      start_date,
      due_date,
      employee_id,
    } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM tasks WHERE id=?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    if (existing[0].status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed tasks cannot be edited.",
      });
    }

    if (new Date(due_date) < new Date(start_date)) {
      return res.status(400).json({
        success: false,
        message: "Due Date cannot be earlier than Start Date.",
      });
    }

    const attachment = req.file
      ? req.file.filename
      : existing[0].attachment;

    await db.query(
      `UPDATE tasks
       SET
       title=?,
       description=?,
       priority=?,
       status=?,
       start_date=?,
       due_date=?,
       attachment=?,
       employee_id=?
       WHERE id=?`,
      [
        title,
        description,
        priority,
        status,
        start_date,
        due_date,
        attachment,
        employee_id,
        id,
      ]
    );

    if (status === "Completed") {
      await db.query(
        `INSERT INTO notifications
        (user_id,message)
        VALUES (?,?)`,
        [
          employee_id,
          `Task "${title}" marked as completed.`,
        ]
      );
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Delete Task
// ==============================
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM tasks WHERE id=?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
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
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};