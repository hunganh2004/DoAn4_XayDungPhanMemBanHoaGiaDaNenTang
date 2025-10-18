
import db from '../common/db.js'
import { Chitiethoadonban } from '../models/chitiethoadonban.model.js'

class ChitiethoadonbanService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToChitiethoadonban(data) {
        return data.map(i => new Chitiethoadonban(
			i.id,
			i.ma_san_pham,
			i.ma_hoa_don_ban,
			i.so_luong,
			i.gia_ban,
			i.create_at,
			i.update_at,
        ))
    }
    getAllByMaHoaDonBan(ma_hoa_don_ban, callback) {
        this.db.execQuery('select * from ', this.tablename, ' where ma_hoa_don_ban = ? ', ma_hoa_don_ban, callback)
    }
    deleteByMaHoaDonBan(ma_hoa_don_ban, callback) {
        this.db.execQuery('delete from ', this.tablename, ' where ma_hoa_don_ban = ? ', ma_hoa_don_ban, callback)
    }p
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToChitiethoadonban, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToChitiethoadonban, callback)
    }
    insert(obj, callback) {
        const chitiethoadonban = this.converToChitiethoadonban(obj)
        this.db.insert(this.tablename, chitiethoadonban[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const chitiethoadonban = this.converToChitiethoadonban(obj)
        this.db.update(this.tablename, chitiethoadonban[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ma_san_pham', 'ma_hoa_don_ban', 'so_luong', 'gia_ban', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToChitiethoadonban, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ma_san_pham', 'ma_hoa_don_ban', 'so_luong', 'gia_ban', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToChitiethoadonban, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToChitiethoadonban, callback)
    }
}

export default new ChitiethoadonbanService(db, 'chi_tiet_hoa_don_ban')