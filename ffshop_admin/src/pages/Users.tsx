import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const initialUsers = [
    {
        key: '1',
        name: 'Nguyễn Văn A',
        email: 'vana@example.com',
        role: 'Quản trị viên',
    },
    {
        key: '2',
        name: 'Trần Thị B',
        email: 'thib@example.com',
        role: 'Người dùng',
    },
];

const columns = [
    {
        title: 'Tên người dùng',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
    },
];

const Users: React.FC = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                setUsers([
                    ...users,
                    {
                        key: (users.length + 1).toString(),
                        ...values,
                    },
                ]);
                form.resetFields();
                setIsModalVisible(false);
            })
            .catch(() => {});
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ padding: 24 }}>
            <Space style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Tìm kiếm người dùng"
                    onSearch={handleSearch}
                    enterButton="Tìm kiếm"
                    allowClear
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Thêm người dùng
                </Button>
            </Space>
            <Table columns={columns} dataSource={filteredUsers} />
            <Modal
                title="Thêm người dùng mới"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng nhập vai trò!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;