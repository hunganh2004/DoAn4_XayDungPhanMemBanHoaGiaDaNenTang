import React from 'react';
import { Layout, Menu } from 'antd';
import {

HomeOutlined,
UserOutlined,
ShoppingCartOutlined,
SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => (
<Sider width={220} style={{ minHeight: '100vh', background: '#fff' }}>
    <div style={{ height: 32, margin: 16, fontWeight: 'bold', fontSize: 18 }}>
        FFShop Quản trị
    </div>
    <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ borderRight: 0 }}
        items={[
            {
                key: '1',
                icon: <HomeOutlined />,
                label: 'Trang chủ',
            },
            {
                key: '2',
                icon: <UserOutlined />,
                label: 'Người dùng',
            },
            {
                key: '3',
                icon: <ShoppingCartOutlined />,
                label: 'Đơn hàng',
            },
            {
                key: '4',
                icon: <SettingOutlined />,
                label: 'Cài đặt',
            },
        ]}
    />
</Sider>
);

export default Sidebar;