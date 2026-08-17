import API from "../api/axios.js";

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};


export const getCurrentUser = async () => {
  const { data } = await API.get("/auth/me");
  return data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const { data } = await API.post("/auth/forgot-password", { email });
  return data;
};

// Reset Password
export const resetPassword = async (email, otp, newPassword) => {
  const { data } = await API.post("/auth/reset-password", { email, otp, newPassword });
  return data;
};
