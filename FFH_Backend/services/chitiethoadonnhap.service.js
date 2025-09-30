
import db from '../common/db.js'
import { Chitiethoadonnhap } from '../models/chitiethoadonnhap.model.js'

class ChitiethoadonnhapService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToChitiethoadonnhap(data) {
        return data.map(i => new Chitiethoadonnhap(
			i.id,
			i.ma_san_pham,
			i.ma_hoa_don_nhap,
			i.so_luong,
			i.gia_nhap,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToChitiethoadonnhap, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToChitiethoadonnhap, callback)
    }
    insert(obj, callback) {
        const chitiethoadonnhap = this.converToChitiethoadonnhap(obj)
        this.db.insert(this.tablename, chitiethoadonnhap[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const chitiethoadonnhap = this.converToChitiethoadonnhap(obj)
        this.db.update(this.tablename, chitiethoadonnhap[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ma_san_pham', 'ma_hoa_don_nhap', 'so_luong', 'gia_nhap', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToChitiethoadonnhap, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ma_san_pham', 'ma_hoa_don_nhap', 'so_luong', 'gia_nhap', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToChitiethoadonnhap, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToChitiethoadonnhap, callback)
    }
}

export default new ChitiethoadonnhapService(db, 'chi_tiet_hoa_don_nhap')