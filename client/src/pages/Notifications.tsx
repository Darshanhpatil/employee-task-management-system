import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../services/notificationService";

interface Notification {
  id: number;
  message: string;
  is_read: number;
  created_at: string;
}

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRead = async (id: number) => {
    await markAsRead(id);
    loadNotifications();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete notification?")) return;

    await deleteNotification(id);
    loadNotifications();
  };

  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Notifications</h2>

      {notifications.length === 0 ? (
        <h3>No Notifications</h3>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            style={{
              background: n.is_read ? "#f3f4f6" : "#dbeafe",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p>{n.message}</p>

              <small>
                {new Date(n.created_at).toLocaleString()}
              </small>
            </div>

            <div>
              {!n.is_read && (
                <button
                  onClick={() => handleRead(n.id)}
                  style={{
                    marginRight: "10px",
                    padding: "8px 12px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() => handleDelete(n.id)}
                style={{
                  padding: "8px 12px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Notifications;