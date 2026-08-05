import axios from "axios";

const API = "http://localhost:5000/api/orders";

const config = {
  withCredentials: true,
};

// Create Order
export const createOrder = async (orderData) => {
  const res = await axios.post(API, orderData, config);
  return res.data;
};

// Customer Orders


// Company Pending Orders


// Company Actions





// Delivery
export const getAvailableOrders = async () => {
  const res = await axios.get(`${API}/delivery/available`, config);
  return res.data;
};

export const acceptDelivery = async (id) => {
  const res = await axios.put(`${API}/delivery/accept/${id}`, {}, config);
  return res.data;
};

export const getMyDeliveries = async () => {
  const res = await axios.get(`${API}/delivery/my-deliveries`, config);
  return res.data;
};

export const pickupOrder = async (id) => {
  const res = await axios.put(`${API}/delivery/pickup/${id}`, {}, config);
  return res.data;
};

export const outForDelivery = async (id) => {
  const res = await axios.put(
    `${API}/delivery/out-for-delivery/${id}`,
    {},
    config
  );

  return res.data;
};

export const deliveredOrder = async (id) => {
  const res = await axios.put(`${API}/delivery/delivered/${id}`, {}, config);
  return res.data;
};


export const getMyOrders = async () => {
  const res = await axios.get(`${API}/my-orders`, {
    withCredentials: true,
  });

  return res.data;
};

export const getPendingOrders = async () => {
  const res = await axios.get(`${API}/company/pending`, {
    withCredentials: true,
  });

  return res.data;
};

export const acceptOrder = async (id) => {
  const res = await axios.put(
    `${API}/company/accept/${id}`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};
export const preparingOrder = async (id) => {
  const res = await axios.put(
    `${API}/company/preparing/${id}`,
    {},
    config
  );

  return res.data;
};

export const packedOrder = async (id) => {
  const res = await axios.put(
    `${API}/company/packed/${id}`,
    {},
    config
  );

  return res.data;
};


export const getCompanyOrders = async (status) => {
  const res = await axios.get(
    `${API}/company?status=${status}`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};