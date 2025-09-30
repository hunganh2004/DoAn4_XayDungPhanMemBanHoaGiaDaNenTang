
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import config from 'config'
import multer from 'multer'
import fs from 'fs'

import chitiethoadonbanRouter from './routes/chitiethoadonban.route.js'
import chitiethoadonnhapRouter from './routes/chitiethoadonnhap.route.js'
import hoadonbanRouter from './routes/hoadonban.route.js'
import hoadonnhapRouter from './routes/hoadonnhap.route.js'
import loaisanphamRouter from './routes/loaisanpham.route.js'
import nguoidungRouter from './routes/nguoidung.route.js'
import nhacungcapRouter from './routes/nhacungcap.route.js'
import sanphamRouter from './routes/sanpham.route.js'

var app = express()
app.use(cors())
app.use(express.json());  // 👈 Cần dòng này để đọc JSON từ body
app.use(express.urlencoded({ extended: true })); // Nếu gửi form data

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))

if (!fs.existsSync(path.join(__dirname, 'public/uploads'))) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `D:\\12522W1KS\\Phat_trien_ung_dung_Mobile_da_nen_tang\\FFH_Backend\\public\\uploads`)
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    } 
})

const upload = multer({ 
    storage: storage, 
    // limits: { fileSize: 1024 * 1024 * 5 }, // Giới hạn kích thước file là 5MB
    // fileFilter: function (req, file, cb) {
    //     const filetypes = /jpeg|jpg|png|gif/;
    //     const mimetype = filetypes.test(file.mimetype);
    //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //     if (mimetype && extname) {
    //         return cb(null, true);
    //     }
    //     cb('Error: File upload only supports the following filetypes - ' + filetypes);
    // }
})

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Không có file nào được tải lên.')
    }
    const fileUrl = `/uploads/${req.file.filename}`
    // const fileUrl = `http://localhost:${config.get('PORT')}/uploads/${req.file.filename}`
    res.status(200).send(fileUrl)
})

app.post('/uploads', upload.array('images',5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Không có file nào được tải lên.')
    }
    const fileUrls = req.files.map(file => `/uploads/${file.filename}`)
    res.status(200).send(fileUrls)
})



app.use('/chitiethoadonban',chitiethoadonbanRouter)
app.use('/chitiethoadonnhap',chitiethoadonnhapRouter)
app.use('/hoadonban',hoadonbanRouter)
app.use('/hoadonnhap',hoadonnhapRouter)
app.use('/loaisanpham',loaisanphamRouter)
app.use('/nguoidung',nguoidungRouter)
app.use('/nhacungcap',nhacungcapRouter)
app.use('/sanpham',sanphamRouter)

const PORT = config.get('PORT')
app.listen(PORT, ()=> {
    console.log(`http://localhost:` + PORT)
})