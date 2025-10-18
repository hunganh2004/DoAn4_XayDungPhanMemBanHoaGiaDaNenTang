
class Nguoidung {
	constructor(id, ten_nguoi_dung, email_nguoi_dung, mat_khau_nguoi_dung, vai_tro, sdt_nguoi_dung, dia_chi_nguoi_dung, anh_nguoi_dung, token, create_at, update_at) {
		this.id = id
		this.ten_nguoi_dung = ten_nguoi_dung
		this.email_nguoi_dung = email_nguoi_dung
		this.mat_khau_nguoi_dung = mat_khau_nguoi_dung
		this.vai_tro = vai_tro
        this.sdt_nguoi_dung = sdt_nguoi_dung
        this.dia_chi_nguoi_dung = dia_chi_nguoi_dung
        this.anh_nguoi_dung = anh_nguoi_dung
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