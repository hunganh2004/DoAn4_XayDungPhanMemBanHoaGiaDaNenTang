import React from 'react';
import { Layout, Menu } from 'antd';
import {

HomeOutlined,
ShopOutlined,
UserOutlined,
SettingOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const Navbar: React.FC = () => {
return (
    <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
            <div style={{ float: 'left', color: '#1890ff', fontWeight: 'bold', fontSize: 20, marginRight: 32 }}>
                FFShop Quản trị
            </div>
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item 
                key="1" 
                icon={<HomeOutlined />}
                onClick={() => {
                    window.location.href = '/';
                }}
                >
                    Trang chủ
                </Menu.Item>
                <Menu.Item key="2" icon={<ShopOutlined />}>
                    Sản phẩm
                </Menu.Item>
                <Menu.Item 
                key="3" 
                icon={<UserOutlined />}
                onClick={() => {
                    window.location.href = '/users';
                }}
                >
                    Người dùng
                </Menu.Item>
                <Menu.Item key="4" icon={<SettingOutlined />}>
                    Cài đặt
                </Menu.Item>
            </Menu>
        </Header>
    </Layout>
);
};

export default Navbar;