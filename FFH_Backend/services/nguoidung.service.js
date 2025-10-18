
import db from '../common/db.js'
import { Nguoidung } from '../models/nguoidung.model.js'

class NguoidungService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToNguoidung(data) {
        console.log('Converting to Nguoidung:', data)
        return data.map(i => new Nguoidung(
			i.id,
			i.ten_nguoi_dung,
			i.email_nguoi_dung,
			i.mat_khau_nguoi_dung,
			i.vai_tro,
            i.sdt_nguoi_dung,
            i.dia_chi_nguoi_dung,
            i.anh_nguoi_dung,
			i.token,
			i.create_at,
			i.update_at,
        ))
    }
    login(email, mat_khau, callback) {
        const sql = `SELECT * FROM ${this.tablename} WHERE email_nguoi_dung = ? AND mat_khau_nguoi_dung = ?`
        console.log(sql)
        console.log(email, mat_khau)
        this.db.execQuery(sql,'','', [email, mat_khau], (err, result) => {
            console.log(err)
            console.log(result)
            if (err) {
                return callback(err)
            }
            if (result.length === 0) {
                return callback(null, null)
            }
            const nguoidung = this.converToNguoidung(result)
            return callback(null, nguoidung)
        })
    }
    signup(ten_nguoi_dung,email, mat_khau, callback) {
        const sql = `insert into ${this.tablename} 
        (ten_nguoi_dung, email_nguoi_dung, mat_khau_nguoi_dung, anh_nguoi_dung, vai_tro) values (?, ?, ?, '/','khách hàng')`
        this.db.execQuery(sql, '', '', [ten_nguoi_dung, email, mat_khau], (err, result) => {
            
            if (err) {
                return callback(err)
            }
            return callback(result)
        })
    }
    updatePassword(id, currentPass, newPass, callback) {
        const sql = `update ${this.tablename} SET mat_khau_nguoi_dung = ? WHERE id = ? and mat_khau_nguoi_dung= ?`
        this.db.execQuery(sql, '', '', [newPass, id, currentPass], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(this.converToNguoidung(result))
            }
        })
    }
    updateInfo(id, obj, callback) {
        const sql = `update ${this.tablename} 
        SET ?
        WHERE id = ?`
        this.db.execQuery(sql, '', '', [obj, id], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback('Cập nhật thành công thông tin người dùng có id: ' + id)
            }
        })
    }
    updateToken() {

    }
    updateRole() {

    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToNguoidung, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToNguoidung, callback)
    }
    insert(obj, callback) {
        const nguoidung = this.converToNguoidung(obj)
        this.db.insert(this.tablename, nguoidung[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const nguoidung = this.converToNguoidung(obj)
        this.db.update(this.tablename, nguoidung[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_nguoi_dung', 'email_nguoi_dung', 'mat_khau_nguoi_dung', 'vai_tro', 'sdt_nguoi_dung', 'dia_chi_nguoi_dung', 'anh_nguoi_dung', 'token', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToNguoidung, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_nguoi_dung', 'email_nguoi_dung', 'mat_khau_nguoi_dung', 'vai_tro','sdt_nguoi_dung', 'dia_chi_nguoi_dung', 'anh_nguoi_dung', 'token', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToNguoidung, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToNguoidung, callback)
    }
}

export default new NguoidungService(db, 'nguoi_dung')