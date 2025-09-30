
import db from '../common/db.js'
import { Nhacungcap } from '../models/nhacungcap.model.js'

class NhacungcapService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToNhacungcap(data) {
        return data.map(i => new Nhacungcap(
			i.id,
			i.ten_nha_cung_cap,
			i.dia_chi_nha_cung_cap,
			i.sdt_nha_cung_cap,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToNhacungcap, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToNhacungcap, callback)
    }
    insert(obj, callback) {
        const nhacungcap = this.converToNhacungcap(obj)
        this.db.insert(this.tablename, nhacungcap[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const nhacungcap = this.converToNhacungcap(obj)
        this.db.update(this.tablename, nhacungcap[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_nha_cung_cap', 'dia_chi_nha_cung_cap', 'sdt_nha_cung_cap', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToNhacungcap, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_nha_cung_cap', 'dia_chi_nha_cung_cap', 'sdt_nha_cung_cap', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToNhacungcap, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToNhacungcap, callback)
    }
}

export default new NhacungcapService(db, 'nha_cung_cap')