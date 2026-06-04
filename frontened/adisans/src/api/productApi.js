import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/v1/user",
});

export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data.products;
};
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};