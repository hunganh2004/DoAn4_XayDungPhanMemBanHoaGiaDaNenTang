
import service from '../services/nguoidung.service.js'


class NguoidungController {
    constructor(service) {
        this.service = service
        this.signup = this.signup.bind(this)
        this.login = this.login.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.updateInfo = this.updateInfo.bind(this)
        this.getAll = this.getAll.bind(this)
        this.getById = this.getById.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.getPagination = this.getPagination.bind(this)
        this.getSearch = this.getSearch.bind(this)
        this.getPaginationSearch = this.getPaginationSearch.bind(this)
    }
    signup(req, res) {
        const { ten_nguoi_dung, email_nguoi_dung, mat_khau_nguoi_dung } = req.body

        console.log(req.body)

        service.signup(ten_nguoi_dung, email_nguoi_dung, mat_khau_nguoi_dung, (result) => {
            res.send(result)
        })
    }
    login(req, res) {
        const { email_nguoi_dung, mat_khau_nguoi_dung } = req.body
        
        service.login(email_nguoi_dung, mat_khau_nguoi_dung, (result) => {
            res.send(result)
        }) 
    }
    updatePassword(req, res) {
        const { id, currentPass, newPass } = req.body

        service.updatePassword(id, currentPass, newPass, (result) => {
            res.send(result)
        })
    }
    updateInfo(req, res) {
        const { id } = req.params
        const {
            ten_nguoi_dung,
            email_nguoi_dung,
            sdt_nguoi_dung,
            dia_chi_nguoi_dung,
            anh_nguoi_dung
        } = req.body

        const obj = {
            ten_nguoi_dung,
            email_nguoi_dung,
            sdt_nguoi_dung,
            dia_chi_nguoi_dung,
            anh_nguoi_dung
        }

        service.updateInfo(id, obj, (result) => {
            res.send(result)
        })
    }
    getSearch(req, res) {
        const searchValue = req.query.searchValue

        service.getSearch(searchValue, (result) => {
            res.send(result)
        })
    }
    getPaginationSearch(req, res) {
        const searchValue = req.query.searchValue
        const pageSize = parseInt(req.query.pageSize) || 10
        const pageNumber = parseInt(req.query.pageNumber) || 1

        service.getPaginationSearch(searchValue, pageSize, pageNumber, (result) => {
            res.send(result)
        })
    }
    getPagination(req, res) {
        const pageSize = parseInt(req.query.pageSize) || 10
        const pageNumber = parseInt(req.query.pageNumber) || 1

        console.log("pageSize:", pageSize, "pageNumber:", pageNumber); // Debug giá trị

        service.getPagination(pageSize, pageNumber, (result) => {
            res.send(result)
        })
    }
    getAll(req, res){
        this.service.getAll((result)=>{
            res.send(result)
        })
    } 
    getById(req, res) {
        const id = req.params.id
        service.getById(id, (result)=> {
            res.send(result)
        })
    }
    insert(req, res) {
        const nguoidung = req.body
        service.insert(nguoidung, (result) => {
            res.send(result)
        })
    }
    update(req, res) {
        const nguoidung = req.body
        // const id = req.params.id
        console.log(nguoidung)
        service.update(nguoidung, (result) => {
            res.send(result)
        })
    }
    delete(req, res) {
        const id = req.params.id
        service.delete(id, (result) => {
            res.send(result)
        })
    }
}

export default new NguoidungController(service)