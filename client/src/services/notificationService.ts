import api from "./api";

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

export const markAsRead = async (id: number) => {
  const res = await api.put(`/notifications/${id}`);
  return res.data;
};

export const deleteNotification = async (id: number) => {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
};