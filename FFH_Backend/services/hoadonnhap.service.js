
import db from '../common/db.js'
import { Hoadonnhap } from '../models/hoadonnhap.model.js'

class HoadonnhapService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToHoadonnhap(data) {
        return data.map(i => new Hoadonnhap(
			i.id,
			i.ma_nha_cung_cap,
			i.ngay_nhap,
			i.tong_tien,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToHoadonnhap, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToHoadonnhap, callback)
    }
    insert(obj, callback) {
        const hoadonnhap = this.converToHoadonnhap(obj)
        this.db.insert(this.tablename, hoadonnhap[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const hoadonnhap = this.converToHoadonnhap(obj)
        this.db.update(this.tablename, hoadonnhap[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ma_nha_cung_cap', 'ngay_nhap', 'tong_tien', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToHoadonnhap, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ma_nha_cung_cap', 'ngay_nhap', 'tong_tien', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToHoadonnhap, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToHoadonnhap, callback)
    }
}

export default new HoadonnhapService(db, 'hoa_don_nhap')