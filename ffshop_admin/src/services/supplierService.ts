import api from "./api";
import { Supplier } from "../types/Supplier";

export const getAllSuppliers = async () => {
    const res = await api.get('/nhacungcap/all')
    return res.data
}