import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api/v1/order",
    withCredentials: true,
});

export const createOrder = async (orderData) => {
    const res = await API.post("/create", orderData);
    return res.data;
};

export const getMyOrders = async () => {
    const res = await API.get("/my-orders");
    return res.data.orders;
};

export const getAllOrders = async () => {
    const res = await API.get("/all");
    return res.data.orders;
};

export const markAsDelivered = async (id) => {
    const res = await API.put(`/deliver/${id}`);
    return res.data;
};
