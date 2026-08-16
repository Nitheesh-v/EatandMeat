import API from "../api/axios.js";

// Public: Get all active categories
export const getCategories = async () => {
  const { data } = await API.get("/categories");
  return data;
};

// Admin: Create category
export const createCategory = async (categoryData) => {
  const { data } = await API.post("/categories", categoryData);
  return data;
};

// Admin: Update category
export const updateCategory = async (id, categoryData) => {
  const { data } = await API.put(`/categories/${id}`, categoryData);
  return data;
};

// Admin: Delete category
export const deleteCategory = async (id) => {
  const { data } = await API.delete(`/categories/${id}`);
  return data;
};
