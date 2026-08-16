import API from "../api/axios.js";

// Create Order
export const createOrder = async (orderData) => {
  const { data } = await API.post("/orders", orderData);
  return data;
};

// Customer Orders
export const getMyOrders = async () => {
  const { data } = await API.get("/orders/my-orders");
  return data;
};

// Company Pending Orders
export const getPendingOrders = async () => {
  const { data } = await API.get("/orders/company/pending");
  return data;
};

// Company Actions
export const acceptOrder = async (id) => {
  const { data } = await API.put(`/orders/company/accept/${id}`);
  return data;
};

export const preparingOrder = async (id) => {
  const { data } = await API.put(`/orders/company/preparing/${id}`);
  return data;
};

export const packedOrder = async (id) => {
  const { data } = await API.put(`/orders/company/packed/${id}`);
  return data;
};

export const getCompanyOrders = async (status) => {
  const { data } = await API.get(`/orders/company?status=${status}`);
  return data;
};

// Delivery
export const getAvailableOrders = async () => {
  const { data } = await API.get("/orders/delivery/available");
  return data;
};

export const acceptDelivery = async (id) => {
  const { data } = await API.put(`/orders/delivery/accept/${id}`);
  return data;
};

export const getMyDeliveries = async () => {
  const { data } = await API.get("/orders/delivery/my-deliveries");
  return data;
};

export const pickupOrder = async (id) => {
  const { data } = await API.put(`/orders/delivery/pickup/${id}`);
  return data;
};

export const outForDelivery = async (id) => {
  const { data } = await API.put(`/orders/delivery/out-for-delivery/${id}`);
  return data;
};

export const deliveredOrder = async (id) => {
  const { data } = await API.put(`/orders/delivery/delivered/${id}`);
  return data;
};
