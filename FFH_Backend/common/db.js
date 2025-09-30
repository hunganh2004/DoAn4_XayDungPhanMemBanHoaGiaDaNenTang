
import mysql from 'mysql2'

const host = 'localhost'
const user = 'root'
const password = 'hunganh2004'
const database = 'reactnative_ff'

class ConnectToMySql  {
	constructor(host, user, password, database) {
		this.db = mysql.createConnection({
			host: host,
			user: user,
			password: password,
			database: database
		})
	}
	getSearch(tablename, searchValue, fields,convert_to_Obj, callback) {
		if (!fields || fields.length === 0) {
			return callback(new Error("Cần ít nhất một trường để tìm kiếm"));
		}

		const whereClause = fields.map(field => `${field} like ?`).join(' or ')
		const values = fields.map(() => `%${searchValue}%`)

		this.db.query('select * from ' + tablename + ' where ' + whereClause, values, (err, result) => {
			if (err) {
				return callback(err)
			}
			callback(convert_to_Obj(result))
		})
	}
	getPaginationSearch(tablename, searchValue, fields, pageSize, pageNumber,convert_to_Obj, callback) {
		const position = (parseInt(pageNumber) - 1) * parseInt(pageSize);
		if (!fields || fields.length === 0) {
			return callback(new Error("Cần ít nhất một trường để tìm kiếm"));
		}
		if (isNaN(pageSize) || isNaN(pageNumber) || pageSize <= 0 || pageNumber <= 0) {
			return callback(new Error("pageSize và pageNumber phải là số nguyên dương"));
		}
		const whereClause = fields.map(field => `${field} like ?`).join(' or ')
		const values = fields.map(() => `%${searchValue}%`)
		values.push(parseInt(pageSize))
		values.push(position)

		this.db.query('select * from ' + tablename + ' where ' + whereClause + ' order by id limit ? offset ?' , values, (err, result) => {
			if (err) {
				return callback(err)
			}
			callback(convert_to_Obj(result))
		})
	}
	getPagination(tablename,pageSize, pageNumber, convert_to_Obj, callback) {
		const position = (parseInt(pageNumber) - 1) * parseInt(pageSize);

		if (isNaN(pageSize) || isNaN(pageNumber) || pageSize <= 0 || pageNumber <= 0) {
			return callback(new Error("pageSize và pageNumber phải là số nguyên dương"));
		}

		this.db.query('select * from ' + tablename + ' order by id limit ? offset ?',[parseInt(pageSize),position], (err, result) => {
			if (err) {
				return callback(err)
			}
			callback(convert_to_Obj(result))
		})
	}
	execQuery(first, tablename,second, parameter, callback) {
		this.db.query(first + tablename + second, parameter, (err, result) => {
			if (err) {
				return callback(err)
			}
			if (!result) {
				return callback('Không tìm thấy du lieu !')
			}
			callback(result)
		})
	}
	getAll(tablename,convert_to_Obj, callback) {
		this.db.query('select * from ' + tablename, (err, result) => {
			if (err) {
				return callback(err)
			}
			callback(convert_to_Obj(result))
		})
	}
	getById(tablename, id, convert_to_Obj, callback) {
		this.db.query('select * from ' + tablename + ' where id = ? ', id, (err, result) => {
			if (err) {
				return callback(err)
			}
			callback(convert_to_Obj(result))
		})
	}
	insert(tablename,obj, callback){
		this.db.query('insert into ' + tablename + ' set ?', obj, (err, result) => {
			if (err) {
				return callback(err)
			}
			callback({id: result.insertId, ...obj})
		})
	}
	update(tablename,obj, callback) {
		this.db.query('update ' + tablename + ' set ? where id = ? ', [obj, obj.id], (err, result) => {
			if (err) {
				return callback(err)
			}
			if (result.affectedRows === 0) {
				return callback('Không tìm thấy bản ghi có id là ' + obj.id || 'null')
			}
			callback('cập nhật bảng ' + tablename + 'với id ' +obj.id+  'thành công !')
		})
	}
	delete(tablename,id, callback) {
		this.db.query('delete from ' + tablename + ' where id = ? ', id, (err, result) => {
			if (err) {
				return callback(err)
			}
			if (result.affectedRows === 0) {
				return callback('Không tìm thấy bản ghi có id là ' + id || 'null')
			}
			callback('Xóa thành công id ' + id + ' trong bảng ' + tablename)
		})
	}
}
export default new ConnectToMySql(host, user, password, database)