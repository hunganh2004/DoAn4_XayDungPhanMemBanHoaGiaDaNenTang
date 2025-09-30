
class Chitiethoadonban {
	constructor(id, ma_san_pham, ma_hoa_don_ban, so_luong, gia_ban, create_at, update_at) {
		this.id = id
		this.ma_san_pham = ma_san_pham
		this.ma_hoa_don_ban = ma_hoa_don_ban
		this.so_luong = so_luong
		this.gia_ban = gia_ban
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

export {Chitiethoadonban}