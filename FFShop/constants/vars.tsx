
// export const host = 'http://192.168.42.151:9604'
export const host = 'http://localhost:9604'


export const api_san_pham_getAll = host + '/sanpham/all'

export const api_san_pham_getPagination = host + '/sanpham/pagination'

export const api_loai_san_pham_getAll = host + '/loaisanpham/all'

export const api_san_pham_get_by_id = (id: number) => {
    return host + '/sanpham/' + id
}

export const api_nguoi_dung_login = host + '/nguoidung/login'
