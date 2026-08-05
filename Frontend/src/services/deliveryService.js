import axios from "axios";

const API = "http://localhost:5000/api/orders";

// Get Available Orders
export const getAvailableOrders = async () => {
  const res = await axios.get(`${API}/delivery/available`, {
    withCredentials: true,
  });

  return res.data;
};

// Accept Delivery
export const acceptDelivery = async (id) => {
  const res = await axios.put(
    `${API}/delivery/accept/${id}`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};

// My Deliveries
export const getMyDeliveries = async () => {
  const res = await axios.get(`${API}/delivery/my-deliveries`, {
    withCredentials: true,
  });

  return res.data;
};