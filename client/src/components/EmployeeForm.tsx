import { useState } from "react";

interface Props {
  onSave: (employee: any) => void;
}

function EmployeeForm({ onSave }: Props) {
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "Employee",
    department: "",
    designation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    onSave(employee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="full_name"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
      />

      <input
        name="designation"
        placeholder="Designation"
        onChange={handleChange}
      />

      <select
        name="role"
        onChange={handleChange}
      >
        <option>Employee</option>
        <option>Admin</option>
      </select>

      <button>
        Save Employee
      </button>
    </form>
  );
}

export default EmployeeForm;