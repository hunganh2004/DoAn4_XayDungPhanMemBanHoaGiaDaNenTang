import { Button, Result } from "antd"
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return(
        <Result 
            status={'404'}
            title='404'
            subTitle='Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa !'
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    Quay về trang chủ
                </Button>
            }
        />
    )
}

export default NotFound