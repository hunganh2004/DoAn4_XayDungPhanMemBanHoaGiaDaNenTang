
import db from '../common/db.js'
import { Loaisanpham } from '../models/loaisanpham.model.js'

class LoaisanphamService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToLoaisanpham(data) {
        return data.map(i => new Loaisanpham(
			i.id,
			i.ten_loai_san_pham,
			i.anh_loai_san_pham,
			i.url_loai_san_pham,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToLoaisanpham, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToLoaisanpham, callback)
    }
    insert(obj, callback) {
        const loaisanpham = this.converToLoaisanpham(obj)
        this.db.insert(this.tablename, loaisanpham[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const loaisanpham = this.converToLoaisanpham(obj)
        this.db.update(this.tablename, loaisanpham[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_loai_san_pham', 'anh_loai_san_pham', 'url_loai_san_pham', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToLoaisanpham, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_loai_san_pham', 'anh_loai_san_pham', 'url_loai_san_pham', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToLoaisanpham, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToLoaisanpham, callback)
    }
}

export default new LoaisanphamService(db, 'loai_san_pham')