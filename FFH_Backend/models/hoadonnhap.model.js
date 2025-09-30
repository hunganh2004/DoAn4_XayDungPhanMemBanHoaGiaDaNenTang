
class Hoadonnhap {
	constructor(id, ma_nha_cung_cap, ngay_nhap, tong_tien, create_at, update_at) {
		this.id = id
		this.ma_nha_cung_cap = ma_nha_cung_cap
		this.ngay_nhap = ngay_nhap
		this.tong_tien = tong_tien
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

export {Hoadonnhap}