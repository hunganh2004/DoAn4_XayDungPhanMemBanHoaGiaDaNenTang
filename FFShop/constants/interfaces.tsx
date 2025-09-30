export interface Product {
    id: number;
    ten_san_pham: string;
    gia_san_pham: number; 
    anh_san_pham: string;
    mo_ta_san_pham: string;
    so_luong_ton: number;
    ma_loai_san_pham: number;
    ma_nha_cung_cap: number;
    create_at: string; 
    update_at: string;
}

export interface Category {
    id: number;
    ten_loai_san_pham: string;
    anh_loai_san_pham: string;
    url_loai_san_pham: string;
    create_at: string; 
    update_at: string;
}

export interface User {
    id: number;
    ten_nguoi_dung: string;
    email_nguoi_dung: string;
    vai_tro: string;
    sdt_nguoi_dung: string;
    dia_chi_nguoi_dung: string;
    anh_nguoi_dung: string;
    token: string;
    create_at: string; 
    update_at: string;
}


export interface SalesInvoice {
    id: number,
    ma_nguoi_dung: number,
    ngay_ban: string,
    tong_tien: number,
    ghi_chu: number,
    trang_thai: string,
    create_at: string,
    update_at: string
}

export interface SalesInvoiceDetail {
    id: number,
    ma_san_pham: number,
    ma_hoa_don_ban: number,
    so_luong: number,
    gia_ban: number,
    create_at: string,
    update_at: string
}

export interface CartItem extends Product {
    so_luong_mua: number,
}