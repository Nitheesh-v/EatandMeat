import API from "../api/axios.js";

// Dashboard Stats
export const getDeliveryStats = async () => {
  const { data } = await API.get("/orders/delivery/stats");
  return data;
};

// Earnings
export const getDeliveryEarnings = async () => {
  const { data } = await API.get("/orders/delivery/earnings");
  return data;
};

// Available Orders
export const getAvailableOrders = async () => {
  const { data } = await API.get("/orders/delivery/available");
  return data;
};

// Accept Delivery
export const acceptDelivery = async (id) => {
  const { data } = await API.put(`/orders/delivery/accept/${id}`);
  return data;
};

// My Deliveries
export const getMyDeliveries = async () => {
  const { data } = await API.get("/orders/delivery/my-deliveries");
  return data;
};

// Pickup
export const pickupOrder = async (id) => {
  const { data } = await API.put(`/orders/delivery/pickup/${id}`);
  return data;
};

// Out for Delivery
export const outForDelivery = async (id) => {
  const { data } = await API.put(`/orders/delivery/out-for-delivery/${id}`);
  return data;
};

// Delivered
export const deliveredOrder = async (id) => {
  const { data } = await API.put(`/orders/delivery/delivered/${id}`);
  return data;
};

// Get single order detail (delivery partner)
export const getDeliveryOrderDetail = async (id) => {
  const { data } = await API.get(`/orders/delivery/order/${id}`);
  return data;
};

// Get delivery history with filters
export const getDeliveryHistory = async (params = {}) => {
  const { data } = await API.get("/orders/delivery/history", { params });
  return data;
};
