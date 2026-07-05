import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeList from "./pages/EmployeeList";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Employee Management */}
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/list" element={<EmployeeList />} />

      {/* Task Management */}
      <Route path="/tasks" element={<Tasks />} />

      {/* Reports */}
      <Route path="/reports" element={<Reports />} />

      {/* Notifications */}
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;