import api from "./api";
import { Category } from "../types/Category";

export const getAllCategories = async () => {
    const res = await api.get('/loaisanpham/all')
    return res.data
}

export const getProductById = async (categoryId: number) => {
    const res = await api.get(`/loaisanpham/${categoryId}`)
    return res.data
}

export const createCategory = async (categoryData: Category) => {
    const res = await api.post('/loaisanpham', [categoryData])
    return res.data
}

export const updateCategory = async (categoryData: Category) => {
    const res = await api.put('/loaisanpham', [categoryData])
    return res.data
}

export const deleteCategory = async (categoryId: number) => {
    const res = await api.delete(`/loaisanpham/${categoryId}`)
    return res.data
}