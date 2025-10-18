
import express from 'express'
const router = express.Router()
import controller from '../controllers/nguoidung.controller.js'

router.get('/pagination/search', controller.getPaginationSearch)
router.get('/all', controller.getAll)
router.get('/search', controller.getSearch)
router.get('/pagination', controller.getPagination)
router.get('/:id', controller.getById)
router.post('/login', controller.login)
router.post('/signup', controller.signup)
router.post('/', controller.insert)
router.put('/password', controller.updatePassword)
router.put('/info/:id', controller.updateInfo)
router.put('/', controller.update)
router.delete('/:id', controller.delete)

export default router