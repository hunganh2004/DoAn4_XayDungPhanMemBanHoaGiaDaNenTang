import React from 'react';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';

const dataSource = [
    {
        key: '1',
        name: 'Nguyễn Văn A',
        order: 32,
        amount: '2.800.000₫',
    },
    {
        key: '2',
        name: 'Trần Thị B',
        order: 28,
        amount: '2.100.000₫',
    },
];

const columns = [
    {
        title: 'Khách hàng',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Đơn hàng',
        dataIndex: 'order',
        key: 'order',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'amount',
        key: 'amount',
    },
];

const Dashboard: React.FC = () => (
    <div style={{ padding: 24 }}>
        <Row gutter={16}>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Người dùng"
                        value={1128}
                        prefix={<UserOutlined />}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Đơn hàng"
                        value={93}
                        prefix={<ShoppingCartOutlined />}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Doanh thu"
                        value={11280000}
                        prefix={<DollarOutlined />}
                        precision={0}
                        suffix="₫"
                    />
                </Card>
            </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={24}>
                <Card title="Đơn hàng gần đây">
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </Card>
            </Col>
        </Row>
    </div>
);

export default Dashboard;