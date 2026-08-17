import API from "../api/axios.js";

// Create support ticket
export const createTicket = async (ticketData) => {
  const { data } = await API.post("/support", ticketData);
  return data;
};

// Get my tickets
export const getMyTickets = async (params = {}) => {
  const { data } = await API.get("/support/my-tickets", { params });
  return data;
};

// Get single ticket
export const getTicket = async (id) => {
  const { data } = await API.get(`/support/${id}`);
  return data;
};

// Reply to ticket
export const replyToTicket = async (id, message) => {
  const { data } = await API.post(`/support/${id}/reply`, { message });
  return data;
};

// Close ticket
export const closeTicket = async (id) => {
  const { data } = await API.put(`/support/${id}/close`);
  return data;
};

// Get FAQ list
export const getFaqs = async () => {
  const { data } = await API.get("/support/faq/list");
  return data;
};
