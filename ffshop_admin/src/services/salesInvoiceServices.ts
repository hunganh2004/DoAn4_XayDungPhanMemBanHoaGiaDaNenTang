import api from "./api";
import { SalesInvoice } from "../types/SalesInvoice";
import { SalesInvoiceDetail } from "../types/SalesInvoiceDetail";

export const getAllSalesInvoices = async () => {
    const res = await api.get('/hoadonban/all')
    return res.data
}

export const deleteSalesInvoice = async (id: number) => {
    try {
        await api.delete(`chitiethoadonban/by-invoice/${id}`)
    } catch {
        console.log("No details to delete");
    }
    try {
        await api.delete(`/hoadonban/${id}`)
    } catch {
        console.log("Invoice not found");
    }
}
export const getSalesInvoiceDetail = async (salesInvoiceId: number) => {
    const res = await api.get(`/chitiethoadonban/by-invoice/${salesInvoiceId}`)
    return res.data
}

export const updateSalesInvoiceStatus = async (id: number, status: string) => {
    const res = await fetch(`http://localhost:9604/hoadonban/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trang_thai: status }),
    });
    return res.ok;
};
