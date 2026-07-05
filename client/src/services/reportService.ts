import api from "./api";

export const getReports = async () => {
  const res = await api.get("/reports");
  return res.data;
};