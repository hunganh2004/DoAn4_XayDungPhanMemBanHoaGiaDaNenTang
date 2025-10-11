import api from "./api";
import { Category } from "../types/Category";

export const getAllCategories = async () => {
    const res = await api.get('/loaisanpham/all')
    return res.data
}