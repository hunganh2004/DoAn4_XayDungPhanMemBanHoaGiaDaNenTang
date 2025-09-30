export interface User {
    id: number
    ten_nguoi_dung: string
    email_nguoi_dung: string
    mat_khau_nguoi_dung?: string
    vai_tro: 'admin' | 'user'
    create_at?: string
    update_at: string
}