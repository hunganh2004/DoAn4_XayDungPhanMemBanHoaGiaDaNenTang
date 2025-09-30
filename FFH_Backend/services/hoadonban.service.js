
import db from '../common/db.js'
import { Hoadonban } from '../models/hoadonban.model.js'

class HoadonbanService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToHoadonban(data) {
        return data.map(i => new Hoadonban(
			i.id,
			i.ma_nguoi_dung,
			i.ngay_ban,
			i.tong_tien,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToHoadonban, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToHoadonban, callback)
    }
    insert(obj, callback) {
        const hoadonban = this.converToHoadonban(obj)
        this.db.insert(this.tablename, hoadonban[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const hoadonban = this.converToHoadonban(obj)
        this.db.update(this.tablename, hoadonban[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ma_nguoi_dung', 'ngay_ban', 'tong_tien', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToHoadonban, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ma_nguoi_dung', 'ngay_ban', 'tong_tien', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToHoadonban, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToHoadonban, callback)
    }
}

export default new HoadonbanService(db, 'hoa_don_ban')