import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard
          title="Employees"
          value={stats.totalEmployees}
          color="#2563eb"
        />

        <DashboardCard
          title="Tasks"
          value={stats.totalTasks}
          color="#16a34a"
        />

        <DashboardCard
          title="Completed"
          value={stats.completedTasks}
          color="#7c3aed"
        />

        <DashboardCard
          title="Pending"
          value={stats.pendingTasks}
          color="#dc2626"
        />
      </div>
    </Layout>
  );
}

export default Dashboard;