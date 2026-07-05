import { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import Layout from "../components/Layout";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  role: string;
  department: string;
  designation: string;
}

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "Employee",
    department: "",
    designation: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let res;

      if (editingId) {
        res = await updateEmployee(editingId, formData);
      } else {
        res = await addEmployee(formData);
      }

      alert(res.message);

      setEditingId(null);

      setFormData({
        full_name: "",
        email: "",
        password: "",
        role: "Employee",
        department: "",
        designation: "",
      });

      loadEmployees();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteEmployee(id);

      alert(res.message);

      loadEmployees();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  const handleEdit = (emp: Employee) => {
    setEditingId(emp.id);

    setFormData({
      full_name: emp.full_name,
      email: emp.email,
      password: "",
      role: emp.role,
      department: emp.department,
      designation: emp.designation,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>
        {editingId ? "Update Employee" : "Add Employee"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
          marginBottom: "40px",
        }}
      >
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Employee</option>
          <option>Admin</option>
        </select>

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          style={{
            width: "220px",
            padding: "12px",
            background: editingId ? "#16a34a" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Employees List</h2>

        <input
          type="text"
          placeholder="🔍 Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,.1)",
        }}
      >
        <thead
          style={{
            background: "#2563eb",
            color: "#fff",
          }}
        >
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Department</th>
            <th style={thStyle}>Designation</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td style={tdStyle}>{emp.id}</td>
                <td style={tdStyle}>{emp.full_name}</td>
                <td style={tdStyle}>{emp.email}</td>
                <td style={tdStyle}>{emp.role}</td>
                <td style={tdStyle}>{emp.department}</td>
                <td style={tdStyle}>{emp.designation}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(emp)}
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#888",
                }}
              >
                No Employee Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const thStyle = {
  padding: "12px",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

export default Employees;