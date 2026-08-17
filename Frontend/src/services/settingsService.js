import API from "../api/axios.js";

// Get my settings
export const getSettings = async () => {
  const { data } = await API.get("/settings");
  return data;
};

// Update notification settings
export const updateNotificationSettings = async (notifications) => {
  const { data } = await API.put("/settings/notifications", notifications);
  return data;
};

// Update preferences
export const updatePreferences = async (preferences) => {
  const { data } = await API.put("/settings/preferences", preferences);
  return data;
};

// Update security settings
export const updateSecuritySettings = async (security) => {
  const { data } = await API.put("/settings/security", security);
  return data;
};

// Update delivery settings
export const updateDeliverySettings = async (delivery) => {
  const { data } = await API.put("/settings/delivery", delivery);
  return data;
};

// Change password
export const changePassword = async (passwordData) => {
  const { data } = await API.put("/settings/change-password", passwordData);
  return data;
};

// Delete account
export const deleteAccount = async () => {
  const { data } = await API.delete("/settings/account");
  return data;
};
