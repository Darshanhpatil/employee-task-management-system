const db = require("../config/db");

const getReports = async (req, res) => {
  try {
    const [completedTasks] = await db.query(
      `
      SELECT
      tasks.id,
      tasks.title,
      users.full_name,
      tasks.priority,
      tasks.status,
      tasks.due_date
      FROM tasks
      JOIN users
      ON tasks.employee_id = users.id
      WHERE tasks.status='Completed'
    `
    );

    const [pendingTasks] = await db.query(
      `
      SELECT
      tasks.id,
      tasks.title,
      users.full_name,
      tasks.priority,
      tasks.status,
      tasks.due_date
      FROM tasks
      JOIN users
      ON tasks.employee_id = users.id
      WHERE tasks.status!='Completed'
    `
    );

    const [employeeWise] = await db.query(
      `
      SELECT
      users.full_name,
      COUNT(tasks.id) AS totalTasks,
      SUM(tasks.status='Completed') AS completedTasks,
      SUM(tasks.status!='Completed') AS pendingTasks
      FROM users
      LEFT JOIN tasks
      ON users.id=tasks.employee_id
      WHERE users.role='Employee'
      GROUP BY users.id
    `
    );

    res.status(200).json({
      success: true,
      completedTasks,
      pendingTasks,
      employeeWise,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Server Error"
    });

  }
};

module.exports = {
  getReports,
};