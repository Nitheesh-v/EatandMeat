import API from "../api/axios.js";

// Delivery: Get wallet balance
export const getWallet = async () => {
  const { data } = await API.get("/withdrawals/wallet");
  return data;
};

// Delivery: Request withdrawal
export const requestWithdrawal = async (withdrawalData) => {
  const { data } = await API.post("/withdrawals", withdrawalData);
  return data;
};

// Delivery: Get my withdrawals
export const getMyWithdrawals = async () => {
  const { data } = await API.get("/withdrawals/my");
  return data;
};

// Admin: Get all withdrawals
export const getAllWithdrawals = async (params = {}) => {
  const { data } = await API.get("/withdrawals/all", { params });
  return data;
};

// Admin: Process withdrawal
export const processWithdrawal = async (id, processData) => {
  const { data } = await API.put(`/withdrawals/${id}/process`, processData);
  return data;
};
