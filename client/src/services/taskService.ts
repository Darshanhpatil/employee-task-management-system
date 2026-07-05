import api from "./api";

// Get All Tasks
export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

// Create Task
export const createTask = async (formData: FormData) => {
  const response = await api.post("/tasks", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update Task
export const updateTask = async (
  id: number,
  formData: FormData
) => {
  const response = await api.put(`/tasks/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Task
export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

// Get Single Task
export const getTaskById = async (id: number) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};