import API from "../api/axios.js";

// Dashboard Stats
export const getAdminStats = async () => {
  const { data } = await API.get("/admin/stats");
  return data;
};

// Users (all roles)
export const getAdminUsers = async (params = {}) => {
  const { data } = await API.get("/admin/users", { params });
  return data;
};

export const toggleUser = async (id) => {
  const { data } = await API.put(`/admin/users/${id}/toggle`);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/admin/users/${id}`);
  return data;
};

// Customers
export const getAdminCustomers = async (params = {}) => {
  const { data } = await API.get("/admin/customers", { params });
  return data;
};

// Delivery Partners
export const getDeliveryPartners = async () => {
  const { data } = await API.get("/admin/delivery-partners");
  return data;
};

// Orders
export const getAdminOrders = async (params = {}) => {
  const { data } = await API.get("/admin/orders", { params });
  return data;
};

export const cancelOrder = async (id) => {
  const { data } = await API.put(`/admin/orders/${id}/cancel`);
  return data;
};
