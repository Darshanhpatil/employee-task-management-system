import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";

function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();

      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Employee Management</h1>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp: any) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;