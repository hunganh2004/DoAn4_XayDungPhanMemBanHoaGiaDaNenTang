
import db from '../common/db.js'
import { Sanpham } from '../models/sanpham.model.js'

class SanphamService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToSanpham(data) {
        return data.map(i => new Sanpham(
			i.id,
			i.ten_san_pham,
			i.gia_san_pham,
			i.anh_san_pham,
            i.mo_ta_san_pham,
			i.so_luong_ton,
			i.ma_loai_san_pham,
			i.ma_nha_cung_cap,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToSanpham, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToSanpham, callback)
    }
    insert(obj, callback) {
        const sanpham = this.converToSanpham(obj)
        this.db.insert(this.tablename, sanpham[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const sanpham = this.converToSanpham(obj)
        this.db.update(this.tablename, sanpham[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_san_pham', 'gia_san_pham', 'anh_san_pham','mo_ta_san_pham', 'so_luong_ton', 'ma_loai_san_pham', 'ma_nha_cung_cap', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToSanpham, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_san_pham', 'gia_san_pham', 'anh_san_pham', 'mo_ta_san_pham', 'so_luong_ton', 'ma_loai_san_pham', 'ma_nha_cung_cap', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToSanpham, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToSanpham, callback)
    }
}

export default new SanphamService(db, 'san_pham')