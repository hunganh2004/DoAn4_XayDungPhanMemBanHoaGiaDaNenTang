
import jwt from 'jsonwebtoken'
import config from 'config'


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) return res.status(401).json({message: 'Bạn chưa đăng nhập !'})

    jwt.verify(token, config.get('JWT_SECRET'), (err, user) => {
        if (err) return res.status(403).json({message: 'Token không hợp lệ !'})
        req.user = user
        next()
    })
}

export default authenticateToken