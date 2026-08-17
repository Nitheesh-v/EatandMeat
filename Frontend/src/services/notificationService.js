import API from "../api/axios.js";

// Get my notifications
export const getNotifications = async (params = {}) => {
  const { data } = await API.get("/notifications", { params });
  return data;
};

// Get unread count
export const getUnreadCount = async () => {
  const { data } = await API.get("/notifications/unread-count");
  return data;
};

// Mark one as read
export const markAsRead = async (id) => {
  const { data } = await API.put(`/notifications/${id}/read`);
  return data;
};

// Mark all as read
export const markAllAsRead = async () => {
  const { data } = await API.put("/notifications/read-all");
  return data;
};

// Delete one
export const deleteNotification = async (id) => {
  const { data } = await API.delete(`/notifications/${id}`);
  return data;
};

// Delete all read
export const clearRead = async () => {
  const { data } = await API.delete("/notifications/clear-read");
  return data;
};
