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
    const res = await api.post('/nguoidung', [userData]);
    return res.data;
}

export const deleteUser = async (userId: number) => {
    const res = await api.delete(`/nguoidung/${userId}`);
    return res.data;
}

/*
const {
            ten_nguoi_dung,
            email_nguoi_dung,
            sdt_nguoi_dung,
            dia_chi_nguoi_dung,
            anh_nguoi_dung
        } = req.body
*/
export const updateInfo = async (userId: number, userData: Partial<User>) => {
    const res = await api.put(`/nguoidung/info/${userId}`, userData);
    return res.data;
}

/* const { id, currentPass, newPass } = req.body */
export const updatePassword = async (userId: number, currentPassword: string, newPassword: string) => {
    const res = await api.put(`/nguoidung/password`, { 
        id: userId, 
        currentPass: currentPassword, 
        newPass: newPassword 
    });
    return res.data;
}

export const login = async (username: string, password: string) => {
    const res = await api.post(`nguoidung/login`, {
        email_nguoi_dung: username,
        mat_khau_nguoi_dung: password 
    })
    return res.data
}