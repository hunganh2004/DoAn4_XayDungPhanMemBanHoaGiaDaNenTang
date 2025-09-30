
class Hoadonban {
	constructor(id, ma_nguoi_dung, ngay_ban, tong_tien, create_at, update_at) {
		this.id = id
		this.ma_nguoi_dung = ma_nguoi_dung
		this.ngay_ban = ngay_ban
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

export {Hoadonban}