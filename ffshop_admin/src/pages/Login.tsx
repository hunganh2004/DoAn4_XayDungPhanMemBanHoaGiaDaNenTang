import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { login } from "../services/userService";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const getUser = () => {
        const user = localStorage.getItem('user') 
        return user? JSON.parse(user) : null
    }

    const handleLogin = async () => {
        try {
        const { email, password } = await form.validateFields();
        setLoading(true);
        const res = await login(email, password); // Gọi API đăng nhập
        console.log(res)

        if (res[0].vai_tro === 'admin') {
            message.success("Đăng nhập thành công");
            localStorage.setItem("user", JSON.stringify(res[0])); // Lưu token
            navigate("/admin/home"); // Điều hướng sang trang quản trị
        } else {
            message.error("Sai tài khoản hoặc mật khẩu");
        }
        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        const user = getUser()
        if (user) {
            navigate('/admin/home')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ maxWidth: 400, margin: "80px auto", padding: 24, boxShadow: "0 0 12px #ddd", borderRadius: 8 }}>
        <Title level={3} style={{ textAlign: "center" }}>Đăng nhập quản trị</Title>
        <Form form={form} layout="vertical" onFinish={handleLogin}>
            <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
            <Input placeholder="admin@example.com" />
            </Form.Item>
            <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
            <Input.Password placeholder="••••••••" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
            </Button>
        </Form>
        </div>
    );
};

export default LoginPage;