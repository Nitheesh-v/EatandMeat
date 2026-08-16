import API from "../api/axios.js";

// Public: Get all products
export const getProducts = async (params = {}) => {
  const { data } = await API.get("/products", { params });
  return data;
};

// Public: Get single product
export const getProductById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

// Admin: Get all products (including inactive)
export const getAdminProducts = async (params = {}) => {
  const { data } = await API.get("/products/admin/all", { params });
  return data;
};

// Admin: Create product
export const createProduct = async (productData) => {
  const { data } = await API.post("/products", productData);
  return data;
};

// Admin: Update product
export const updateProduct = async (id, productData) => {
  const { data } = await API.put(`/products/${id}`, productData);
  return data;
};

// Admin: Delete product
export const deleteProduct = async (id) => {
  const { data } = await API.delete(`/products/${id}`);
  return data;
};
