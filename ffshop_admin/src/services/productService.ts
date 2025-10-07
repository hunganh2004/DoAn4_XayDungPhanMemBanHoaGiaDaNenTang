import api from "./api";
import { Product } from "../types/Product";

export const getAllProducts = async () => {
    const res = await api.get('/sanpham/all')
    return res.data
}

export const getPaginatedProducts = async (page: number, limit: number) => {
    const res = await api.get(`/sanpham/pagination?pageSize=${limit}&pageNumber=${page}`)
    return res.data
}

export const getProductById = async (productId: number) => {
    const res = await api.get(`/sanpham/${productId}`)
    return res.data
}

export const createProduct = async (productData: Product) => {
    const res = await api.post('/sanpham', productData)
    return res.data
}

export const updateProduct = async (productData: Product) => {
    const res = await api.put('/sanpham', productData)
    return res.data
}

export const deleteProduct = async (productId: number) => {
    const res = await api.delete(`/sanpham/${productId}`)
    return res.data
}