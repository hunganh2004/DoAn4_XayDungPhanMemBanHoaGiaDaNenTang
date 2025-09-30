
class Nhacungcap {
	constructor(id, ten_nha_cung_cap, dia_chi_nha_cung_cap, sdt_nha_cung_cap, create_at, update_at) {
		this.id = id
		this.ten_nha_cung_cap = ten_nha_cung_cap
		this.dia_chi_nha_cung_cap = dia_chi_nha_cung_cap
		this.sdt_nha_cung_cap = sdt_nha_cung_cap
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

export {Nhacungcap}