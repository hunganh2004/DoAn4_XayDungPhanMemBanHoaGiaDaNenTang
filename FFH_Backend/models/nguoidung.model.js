
class Nguoidung {
	constructor(id, ten_nguoi_dung, email_nguoi_dung, mat_khau_nguoi_dung, vai_tro, token, create_at, update_at) {
		this.id = id
		this.ten_nguoi_dung = ten_nguoi_dung
		this.email_nguoi_dung = email_nguoi_dung
		this.mat_khau_nguoi_dung = mat_khau_nguoi_dung
		this.vai_tro = vai_tro
		this.token = token
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

export {Nguoidung}