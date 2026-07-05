const db = require("../config/db");

// ===============================
// Get Notifications
// ===============================
const getNotifications = async (req, res) => {
  try {
    const [notifications] = await db.query(
      `SELECT *
       FROM notifications
       WHERE user_id=?
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Mark Notification Read
// ===============================
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "UPDATE notifications SET is_read=1 WHERE id=?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Notification marked as read.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Delete Notification
// ===============================
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM notifications WHERE id=?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Notification deleted.",
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
  getNotifications,
  markAsRead,
  deleteNotification,
};