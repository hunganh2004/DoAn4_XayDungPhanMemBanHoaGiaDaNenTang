import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table, Tag } from 'antd';
import {
    UserOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    FireOutlined,
} from '@ant-design/icons';
import { getAllUsers } from '../services/userService';
import { getAllSalesInvoices, getSalesInvoiceDetail } from '../services/salesInvoiceServices';
import { getAllProducts } from '../services/productService';
import { User } from '../types/User';
import { SalesInvoice } from '../types/SalesInvoice';
import { SalesInvoiceDetail } from '../types/SalesInvoiceDetail';
import { Product } from '../types/Product';
import { currencyFormat } from '../utils/currencyFormat';

interface ProductStat extends Product {
    so_luong_ban: number;
}

const Dashboard = () => {
    const [userTotal, setUserTotal] = useState<number>(0);
    const [salesInvoiceTotal, setSalesInvoiceTotal] = useState<number>(0);
    const [revenue, setRevenue] = useState<number>(0);
    const [recentInvoices, setRecentInvoices] = useState<SalesInvoice[]>([]);
    const [topProducts, setTopProducts] = useState<ProductStat[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        const users: User[] = await getAllUsers();
        const invoices: SalesInvoice[] = await getAllSalesInvoices();
        const products: Product[] = await getAllProducts();

        setUserTotal(users.length);
        setSalesInvoiceTotal(invoices.length);
        setRevenue(invoices.reduce((sum, item) => sum + item.tong_tien, 0));

        const sortedInvoices = [...invoices].sort(
            (a, b) => new Date(b.ngay_ban).getTime() - new Date(a.ngay_ban).getTime()
        );
        setRecentInvoices(sortedInvoices.slice(0, 6));

        const productStats: Record<number, number> = {};

        for (const invoice of invoices) {
            const details: SalesInvoiceDetail[] = await getSalesInvoiceDetail(invoice.id);
            details.forEach((detail) => {
            productStats[detail.ma_san_pham] =
                (productStats[detail.ma_san_pham] || 0) + detail.so_luong;
            });
        }

        const rankedProducts: ProductStat[] = products
            .map((p) => ({
            ...p,
            so_luong_ban: productStats[p.id] || 0,
            }))
            .sort((a, b) => b.so_luong_ban - a.so_luong_ban)
            .slice(0, 5);

        setTopProducts(rankedProducts);
        };

        fetchData();
    }, []);

    const invoiceColumns = [
        { title: 'Mã hóa đơn', dataIndex: 'id', key: 'id' },
        { title: 'Ngày bán', dataIndex: 'ngay_ban', key: 'ngay_ban' },
        {
        title: 'Tổng tiền',
        dataIndex: 'tong_tien',
        key: 'tong_tien',
        render: (value: number) => currencyFormat(value),
        },
        {
        title: 'Trạng thái',
        dataIndex: 'trang_thai',
        key: 'trang_thai',
        render: (status: string) => {
            const color =
            status === 'Đã thanh toán'
                ? 'green'
                : status === 'Chưa thanh toán'
                ? 'red'
                : status === 'Đang vận chuyển'
                ? 'blue'
                : status === 'Đã hoàn thành'
                ? 'gold'
                : 'default';
            return <Tag color={color}>{status}</Tag>;
        },
        },
    ];

    const productColumns = [
        { title: 'Sản phẩm', dataIndex: 'ten_san_pham', key: 'ten_san_pham' },
        { title: 'Đã bán', dataIndex: 'so_luong_ban', key: 'so_luong_ban' },
    ];

    return (
        <div style={{ padding: 24 }}>
        <Row gutter={16}>
            <Col span={6}>
            <Card>
                <Statistic title="Người dùng" value={userTotal} prefix={<UserOutlined />} />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic title="Đơn hàng" value={salesInvoiceTotal} prefix={<ShoppingCartOutlined />} />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic
                title="Doanh thu"
                value={currencyFormat(revenue)}
                prefix={<DollarOutlined />}
                precision={0}
                suffix="₫"
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card>
                <Statistic
                title="Sản phẩm bán chạy"
                value={topProducts[0]?.ten_san_pham || 'Đang tải...'}
                prefix={<FireOutlined />}
                />
            </Card>
            </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={12}>
            <Card title="Đơn hàng gần đây">
                <Table dataSource={recentInvoices} columns={invoiceColumns} rowKey="id" pagination={false} />
            </Card>
            </Col>
            <Col span={12}>
            <Card title="Top sản phẩm bán chạy">
                <Table dataSource={topProducts} columns={productColumns} rowKey="id" pagination={false} />
            </Card>
            </Col>
        </Row>
        </div>
    );
};

export default Dashboard;