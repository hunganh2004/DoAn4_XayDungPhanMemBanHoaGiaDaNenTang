
class Loaisanpham {
	constructor(id, ten_loai_san_pham, anh_loai_san_pham, create_at, update_at) {
		this.id = id
		this.ten_loai_san_pham = ten_loai_san_pham
		this.anh_loai_san_pham = anh_loai_san_pham
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

export {Loaisanpham}