import API from "../api/axios.js"

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