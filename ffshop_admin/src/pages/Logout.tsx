import React from 'react';
import { Button, Modal } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Modal.confirm({
            title: 'Logout Confirmation',
            content: 'Are you sure you want to logout?',
            onOk() {
                // Clear any auth tokens or user data from localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Redirect to login page
                navigate('/login');
            },
            onCancel() {
                // Do nothing on cancel
            },
        });
    };

    return (
        <Button 
            type="primary" 
            danger 
            icon={<LogoutOutlined />}
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};

export default Logout;