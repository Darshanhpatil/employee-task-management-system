import api from "./api";

export const getEmployees = async () => {
  const response = await api.get("/employees");
  return response.data;
};

export const addEmployee = async (employee: any) => {
  const response = await api.post("/employees", employee);
  return response.data;
};

export const updateEmployee = async (id: number, employee: any) => {
  const response = await api.put(`/employees/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};