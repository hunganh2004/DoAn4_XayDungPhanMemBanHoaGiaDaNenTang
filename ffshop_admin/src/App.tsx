import React, { useState } from 'react';
import {
    BulbOutlined,
    ControlOutlined,
    HomeOutlined,
    LogoutOutlined,
    MoonOutlined,
    ProductOutlined,
    ProfileOutlined,
    SettingOutlined,
    TeamOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import type { BreadcrumbProps, MenuProps } from 'antd';
import { Avatar, Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import {  Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProductManager from './pages/ProductManager';
import CategoryManager from './pages/CategoryManager';
import UserManager from './pages/UserManager';
import { ConfigProvider } from 'antd';
import viVN from "antd/locale/vi_VN";

const { Header, Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];
type BreadcrumbItem = Required<BreadcrumbProps>['items'][number]

function getMenuItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const getBreadcrumItems = (pathname: string): BreadcrumbItem[] => {
    const map: Record<string, string> = {
        '/admin/home': 'Trang chủ',
        '/admin/categories': 'Quản sản phẩm / Danh mục sản phẩm',
        '/admin/product-list': 'Quản lý sản phẩm / Danh sách sản phẩm',
        '/admin/users': 'Quản lý người dùng',
        '/admin/profile': 'Hồ sơ cá nhân',
        '/admin/system': 'Hệ thống',
        '/admin/logout': 'Đăng xuất',
    }

    const title = map[pathname] || 'Trang chủ'
    
    return [{key: pathname, title}]
}


const menuItems: MenuItem[] = [
    getMenuItem('Trang chủ', 'home', <HomeOutlined />),
    getMenuItem('Quản lý sản phẩm', 'sub1', <ProductOutlined />, [
        getMenuItem('Danh mục sản phẩm', 'categories', <UnorderedListOutlined />),
        getMenuItem('Danh sách sản phẩm', 'product-list', <UnorderedListOutlined />),
    ]),
    getMenuItem('Quản lý người dùng', 'users', <TeamOutlined />),
    getMenuItem('Cài đặt', 'sub2', <SettingOutlined />, [
        getMenuItem('Hồ sơ cá nhân', 'profile', <ProfileOutlined />),
        getMenuItem('Hệ thống', 'system', <ControlOutlined />),
        getMenuItem('Đăng xuất', 'logout', <LogoutOutlined />),
    ]),
];

interface AppProps {
    isDark: boolean
    toggleTheme: () => void
}

const App: React.FC<AppProps> = ({isDark, toggleTheme}) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const {
        token: { colorBgContainer, borderRadiusLG, colorText },
    } = theme.useToken();

    return (
        <ConfigProvider locale={viVN} theme={{algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm}}>

        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
            collapsible collapsed={collapsed} 
            onCollapse={(value) => setCollapsed(value)}
            theme={isDark? 'dark':'light'}
            width={'280'}
            >
                <Avatar 
                    size={collapsed? 40 :100}
                    src="http://localhost:9604/uploads/image-1757748160166.jpg" 
                    style={{margin: '30px auto', display:'block'}}
                    />
                {!collapsed && <div style={{ textAlign: 'center', color: colorText,  margin: '20px auto' }}>
                    Nguyễn Hùng Anh
                    </div>}
                <Menu theme={isDark? 'dark':'light'} defaultSelectedKeys={['1']} mode="inline" items={menuItems} 
                    onClick={({key}) => navigate(`/admin/${key}`) }
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, backgroundColor: colorBgContainer, paddingLeft: '10px' }} >
                    <Button 
                        type='primary'
                        icon={isDark? <BulbOutlined />: <MoonOutlined />}
                        onClick={() => toggleTheme()}
                        style={{
                            borderRadius: 24,
                            padding: '0 16px',
                            height: 40,
                            backgroundColor: isDark ? '#6262e1' : '#ff3366',
                            color: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease',
                        }}
                        >
                        Đổi chế độ: {isDark? 'Sáng' : 'Tối'}
                    </Button>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={getBreadcrumItems(location.pathname)} />
                    <div
                        style={{
                        padding: 24,
                        minHeight: 360,
                        backgroundColor: colorBgContainer,
                        borderRadius: borderRadiusLG
                        }}
                    >
                        <Routes>
                            <Route path="/admin/home" element={<Dashboard />} />
                            <Route path='/admin/product-list' element={<ProductManager />} />
                            <Route path='/admin/categories' element={<CategoryManager />} />
                            <Route path='/admin/users' element={<UserManager />} />
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                FFShop ©{new Date().getFullYear()} Created by Nguyen Hung Anh
                </Footer>
            </Layout>
        </Layout>
        </ConfigProvider>
    );
};

export default App;