const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [[employee]] = await db.query(
      "SELECT COUNT(*) AS totalEmployees FROM users"
    );

    const [[task]] = await db.query(
      "SELECT COUNT(*) AS totalTasks FROM tasks"
    );

    const [[completed]] = await db.query(
      "SELECT COUNT(*) AS completedTasks FROM tasks WHERE status='Completed'"
    );

    const [[pending]] = await db.query(
      "SELECT COUNT(*) AS pendingTasks FROM tasks WHERE status!='Completed'"
    );

    res.json({
      totalEmployees: employee.totalEmployees,
      totalTasks: task.totalTasks,
      completedTasks: completed.completedTasks,
      pendingTasks: pending.pendingTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};