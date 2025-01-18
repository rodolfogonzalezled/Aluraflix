import axios from 'axios';

const BASE_URL = 'https://677367fb77a26d4701c52e7c.mockapi.io/';

export const getVideos = async () => {
    const response = await axios.get(`${BASE_URL}/videos`);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
};

export const deleteVideo = async (id) => {
    await axios.delete(`${BASE_URL}/videos/${id}`);
};

export const updateVideo = async (id, data) => {
    await axios.put(`${BASE_URL}/videos/${id}`, data);
};

export const addVideo = async (data) => {
    await axios.post(`${BASE_URL}/videos`, data);
};