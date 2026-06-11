import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api/reviews",
    withCredentials: true,
});

export const createReview = async (data) => {
    const res = await API.post("/", data);
    return res.data;
};

export const getProductReviews = async (productId) => {
    const res = await API.get(`/${productId}`);
    return res.data.reviews;
};

export const deleteReview = async (id) => {
    const res = await API.delete(`/${id}`);
    return res.data;
};
