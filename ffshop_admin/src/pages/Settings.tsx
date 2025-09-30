import React from 'react';
import { Card, Form, Input, Button, Switch } from 'antd';

const Settings: React.FC = () => {
    return (
        <Card title="Cài đặt">
            <Form
                layout="vertical"
                style={{ maxWidth: 400 }}
                initialValues={{ notifications: true }}
            >
                <Form.Item label="Tên người dùng" name="username">
                    <Input placeholder="Nhập tên người dùng" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                    label="Nhận thông báo"
                    name="notifications"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Settings;