
class Sanpham {
	constructor(id, ten_san_pham, gia_san_pham, anh_san_pham, mo_ta_san_pham, so_luong_ton, ma_loai_san_pham, ma_nha_cung_cap, create_at, update_at) {
		this.id = id
		this.ten_san_pham = ten_san_pham
		this.gia_san_pham = gia_san_pham
		this.anh_san_pham = anh_san_pham
		this.mo_ta_san_pham = mo_ta_san_pham
		this.so_luong_ton = so_luong_ton
		this.ma_loai_san_pham = ma_loai_san_pham
		this.ma_nha_cung_cap = ma_nha_cung_cap
		this.create_at = create_at.toLocaleString('vi-VN')
		this.update_at = update_at.toLocaleString('vi-VN')
    }
    toOjectNoPRIandCURRENT_TIMESTAMP() {
        const {id,create_at, update_at, ...newObj} = this
        return newObj
    }
    toOjectNoCURRENT_TIMESTAMP() {
        const {create_at, update_at, ...newObj} = this
        return newObj
    }
}

export {Sanpham}