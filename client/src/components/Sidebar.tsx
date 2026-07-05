import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully.");

    navigate("/");
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    transition: "0.3s",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        width: "250px",
        background: "#1e293b",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Task Manager
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}
      >
        <Link to="/dashboard" style={linkStyle}>
          📊 Dashboard
        </Link>

        <Link to="/employees" style={linkStyle}>
          👥 Employees
        </Link>

        <Link to="/tasks" style={linkStyle}>
          ✅ Tasks
        </Link>

        <Link to="/notifications" style={linkStyle}>
          🔔 Notifications
        </Link>

        <Link to="/reports" style={linkStyle}>
          📈 Reports
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "12px",
          background: "#dc2626",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;