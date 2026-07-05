import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getEmployees } from "../services/employeeService";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

interface Employee {
  id: number;
  full_name: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  full_name: string;
  employee_id: number;
  priority: string;
  status: string;
  start_date: string;
  due_date: string;
  attachment: string;
}

function Tasks() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    employee_id: "",
    priority: "Medium",
    status: "Pending",
    start_date: "",
    due_date: "",
    attachment: null as File | null,
  });

  useEffect(() => {
    loadEmployees();
    loadTasks();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        attachment: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("employee_id", formData.employee_id);
      data.append("priority", formData.priority);
      data.append("status", formData.status);
      data.append("start_date", formData.start_date);
      data.append("due_date", formData.due_date);

      if (formData.attachment) {
        data.append("attachment", formData.attachment);
      }

      let res;

      if (editingId) {
        res = await updateTask(editingId, data);
      } else {
        res = await createTask(data);
      }

      alert(res.message);

      setEditingId(null);

      setFormData({
        title: "",
        description: "",
        employee_id: "",
        priority: "Medium",
        status: "Pending",
        start_date: "",
        due_date: "",
        attachment: null,
      });

      loadTasks();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteTask(id);

      alert(res.message);

      loadTasks();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);

    setFormData({
      title: task.title,
      description: task.description,
      employee_id: String(task.employee_id),
      priority: task.priority,
      status: task.status,
      start_date: task.start_date.split("T")[0],
      due_date: task.due_date.split("T")[0],
      attachment: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Task Management</h2>

      {/* Add Task Form */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
          background: "#fff",
          padding: "20px",
          marginBottom: "30px",
          borderRadius: "10px",
        }}
      >
        <input
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />

        <select
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
        >
          <option value="">Assign Employee</option>

          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          style={{
            gridColumn: "span 2",
            height: "90px",
          }}
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />

        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={handleFileChange}
          style={{
            gridColumn: "span 2",
          }}
        />

        <button
          style={{
            width: "200px",
            padding: "10px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task Table */}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead
          style={{
            background: "#2563eb",
            color: "#fff",
          }}
        >
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Employee</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.full_name}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{task.due_date}</td>
              <td>
                <button
                  onClick={() => handleEdit(task)}
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
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
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Tasks;
