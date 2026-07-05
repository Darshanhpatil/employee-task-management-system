function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Employee Task Management</h2>

      <div>
        <strong>{user.full_name}</strong>
      </div>
    </div>
  );
}

export default Header;