import api from "./api";
import { User } from "../types/User";

export const getAllUsers = async () => {
    const res = await api.get('/nguoidung/all');
    return res.data;
}

export const getPaginatedUsers = async (page: number, limit: number) => {
    const res = await api.get(`/nguoidung/pagination?pageSize=${limit}&pageNumber=${page}`);
    return res.data;
}

export const getUserById = async (userId: number) => {
    const res = await api.get(`/nguoidung/${userId}`);
    return res.data;
}

export const createUser = async (userData: User) => {
    const res = await api.post('/nguoidung', userData);
    return res.data;
}

export const deleteUser = async (userId: number) => {
    const res = await api.delete(`/nguoidung/${userId}`);
    return res.data;
}
