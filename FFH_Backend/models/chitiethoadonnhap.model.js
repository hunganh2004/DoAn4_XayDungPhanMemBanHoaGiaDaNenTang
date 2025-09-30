
class Chitiethoadonnhap {
	constructor(id, ma_san_pham, ma_hoa_don_nhap, so_luong, gia_nhap, create_at, update_at) {
		this.id = id
		this.ma_san_pham = ma_san_pham
		this.ma_hoa_don_nhap = ma_hoa_don_nhap
		this.so_luong = so_luong
		this.gia_nhap = gia_nhap
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

export {Chitiethoadonnhap}