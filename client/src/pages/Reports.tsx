import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Layout from "../components/Layout";
import { getReports } from "../services/reportService";

function Reports() {
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [pendingTasks, setPendingTasks] = useState<any[]>([]);
  const [employeeWise, setEmployeeWise] = useState<any[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports();

      setCompletedTasks(data.completedTasks);
      setPendingTasks(data.pendingTasks);
      setEmployeeWise(data.employeeWise);
    } catch (err) {
      console.log(err);
    }
  };

  const exportCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert("No data available");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => `"${row[h] ?? ""}"`).join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename + ".csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const exportExcel = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert("No data available");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const renderTable = (title: string, data: any[]) => (
    <div
      style={{
        marginBottom: "40px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <h3>{title}</h3>

        <div>
          <button
            onClick={() => exportCSV(data, title)}
            style={{
              marginRight: "10px",
              padding: "8px 14px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Export CSV
          </button>

          <button
            onClick={() => exportExcel(data, title)}
            style={{
              padding: "8px 14px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Export Excel
          </button>
        </div>
      </div>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            background: "#2563eb",
            color: "#fff",
          }}
        >
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((value: any, index) => (
                <td key={index}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Layout>
      <h1 style={{ marginBottom: "30px" }}>Reports</h1>

      {renderTable("Completed Tasks", completedTasks)}

      {renderTable("Pending Tasks", pendingTasks)}

      {renderTable("Employee Wise Report", employeeWise)}
    </Layout>
  );
}

export default Reports;