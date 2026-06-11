import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api/v1/admin",
    withCredentials: true,
});

// Dashboard
export const getDashboardStats = async () => {
    const res = await API.get("/dashboard");
    return res.data.stats;
};

// Users
export const getAllUsers = async () => {
    const res = await API.get("/users");
    return res.data.users;
};

export const deleteUser = async (id) => {
    const res = await API.delete(`/user/${id}`);
    return res.data;
};

export const updateUserRole = async (id, role) => {
    const res = await API.put(`/user/${id}/role`, { role });
    return res.data;
};

// Products
export const getAdminProducts = async () => {
    const res = await API.get("/products");
    return res.data.products;
};

export const createProduct = async (data) => {
    const res = await API.post("/products", data);
    return res.data;
};

export const updateProduct = async (id, data) => {
    const res = await API.put(`/products/${id}`, data);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await API.delete(`/products/${id}`);
    return res.data;
};

// Reviews
export const getAllReviews = async () => {
    const res = await API.get("/reviews");
    return res.data.reviews;
};
