import Constants from "expo-constants";

const ip = Constants.expoConfig?.hostUri?.split(":")[0]
export const host = `http://${ip}:9604`

// export const host = 'http://192.168.43.59:9604'
// export const host = 'http://localhost:9604'


export const api_san_pham_getAll = host + '/sanpham/all'

export const api_san_pham_getPagination = host + '/sanpham/pagination'

export const api_loai_san_pham_getAll = host + '/loaisanpham/all'

export const api_san_pham_get_by_id = (id: number) => {
    return host + '/sanpham/' + id
}

export const api_nguoi_dung_login = host + '/nguoidung/login'
export const api_nguoi_dung_register = host + '/nguoidung/signup'

export const api_update_nguoi_dung_by_id = (id: number) => {
    return host + '/nguoidung/info/' + id
}

export const api_don_hang_create = host + '/hoadonban'
export const api_chi_tiet_don_hang_create = host + '/chitiethoadonban'

export const api_don_hang_get_by_user_id = (user_id: number) => {
    return host + '/donhang/by-user/' + user_id
}

export const api_nguoi_dung_quen_mat_khau = host + '/nguoidung/forgot-password'