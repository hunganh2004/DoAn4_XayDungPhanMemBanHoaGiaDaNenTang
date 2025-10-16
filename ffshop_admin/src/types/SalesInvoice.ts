export interface SalesInvoice {
    id: number,
    ma_nguoi_dung: number,
    ngay_ban: string,
    tong_tien: number,
    ghi_chu: string,
    trang_thai: string, // Chưa thanh toán, đã thanh toán, đang vận chuyển, đã hoàn thành, đã bị hủy
    create_at: string,
    update_at: string,
}