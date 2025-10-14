
import { getAllUsers, createUser, deleteUser, updateInfo } from "../services/userService";
import { uploadSingleImage } from "../services/upload";
import { User } from "../types/User";
import { host } from "../services/host";
import { UploadFile } from "antd/es/upload/interface";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Table, Image, Button, Space, Popconfirm, Modal, Form, Input, InputNumber, Upload } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const UserManager = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [previewImage, setPreviewImage] = useState<UploadFile[]>([])
    const [searchKeyWord, setSearchKeyWord] = useState<string>('')
    const { Search } = Input
    const [pagination, setPagination] = useState({current: 1, pageSize: 6})
    const [form] = Form.useForm()

    useEffect(() => {
        setLoading(true)
        setTimeout(async () => {
            const data = await getAllUsers()
            setUsers(data)
            setLoading(false)
        }, 1000)
    }, [])

    const columns: ColumnsType<User> = [
        {
            title: 'STT',
            align: 'center',
            render: (_: unknown, c: unknown, index: number) => (
                (pagination.current - 1) *  pagination.pageSize + index + 1
            ),
        },
        {
            dataIndex: 'ten_nguoi_dung',
            key: 'ten_nguoi_dung',
            title: 'Tên người dùng',
        },
        {
            dataIndex: 'anh_nguoi_dung',
            key:'anh_nguoi_dung',
            title: 'Ảnh người dùng',
            align: 'center',
            render: (anh_nguoi_dung: string) => (
                <Image
                    width={64}
                    height={64}
                    src={`${host}${anh_nguoi_dung}`}
                    alt='Ảnh người dùng'
                    style={{ borderRadius: 8}}
                />
            ),
        },
        {
            dataIndex: 'email_nguoi_dung',
            key: 'email_nguoi_dung',
            title: 'Email',
        },
        {
            dataIndex: 'sdt_nguoi_dung',
            key: 'sdt_nguoi_dung',
            title: 'Số điện thoại',
        },
        {
            dataIndex: 'dia_chi_nguoi_dung',
            key: 'dia_chi_nguoi_dung',
            title: 'Địa chỉ',
        },
        {
            title: 'Sửa',
            key: 'edit',
            align: 'center',
            width: 50,
            render: (_: unknown, record: User) => (
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                >
                    Sửa
                </Button>
            )
        },
        {
            title: 'Xóa',
            key: 'delete',
            align: 'center',
            width: 50,
            render: (_: unknown, record: User) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa người dùng này?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />}
                    >
                        Xóa
                    </Button>
                </Popconfirm>
            )
        }
    ]

    const handleEdit = (record: User) => {
        setEditingUser(record)
        form.setFieldsValue(record)

        const fileList: UploadFile[] = [
            {
                uid: '-1',
                name: record.anh_nguoi_dung.split('/').pop() || 'image.png',
                status: 'done',
                url: host + record.anh_nguoi_dung,
                thumbUrl: host + record.anh_nguoi_dung
            }
        ]

        setPreviewImage(fileList)
        setIsModalOpen(true)
    }

    const handleDelete = async (id: number) => {
        try {
            setLoading(true)
            await deleteUser(id)
            const updateList = await getAllUsers()
            setUsers(updateList)
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = () => {
        setEditingUser(null)
        form.setFieldsValue({
            id: 0,
            ten_nguoi_dung: '',
            email_nguoi_dung: '',
            mat_Khau_nguoi_dung: '',
            vai_tro: 'khách hàng',
            sdt_nguoi_dung: '',
            dia_chi_nguoi_dung: '',
            anh_nguoi_dung: '',
            token: '',
            create_at: new Date().toISOString(),
            update_at: new Date().toISOString(),
        })
        setIsModalOpen(true)
    }

    const handleUpload = async (options: any) => {
        const { file, onSuccess, onError} = options
        try {
            const response = await uploadSingleImage(file)
            form.setFieldsValue({ anh_nguoi_dung: response})
            onSuccess(response)
        } catch (err) {
            console.error('Lỗi khi upload ảnh: ' + err);
            onError(err);
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            console.log('Form values:', values)
            setLoading(true)
            if (editingUser) {
                await updateInfo(editingUser.id, values)
            } else {
                await createUser(values)
            }
            const updateList = await getAllUsers()
            setUsers(updateList)
        } catch (error) {
            console.error('Lỗi khi lưu thông tin người dùng:', error)
        } finally {
            setLoading(false)
            setIsModalOpen(false)
            form.resetFields()
            setPreviewImage([])
        }
    }

    const filterData = users.filter((item: User) => (
        item.ten_nguoi_dung.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
        item.email_nguoi_dung.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
        item.sdt_nguoi_dung.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
        item.dia_chi_nguoi_dung.toLowerCase().includes(searchKeyWord.toLowerCase()) 
    ))


    return (
        <>
        <Modal
            title={editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={() => {
                setIsModalOpen(false)
                setPreviewImage([])
            }}
            okText={editingUser ? 'Lưu' : 'Thêm'}
            cancelText="Hủy"
            confirmLoading={loading}
            width='50%'
            >
            <Form form={form} layout="vertical">
                <Form.Item name='id' label='ID' hidden>
                    <InputNumber style={{ width: '100%' }} disabled />
                </Form.Item>
                <Form.Item name='ten_nguoi_dung' label='Tên người dùng' rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name='anh_nguoi_dung'
                    label='Ảnh'
                    rules={[{ required: true, message: 'Vui lòng tải ảnh'}]}
                    getValueFromEvent={() => form.getFieldValue('anh_nguoi_dung')}
                    required
                >
                    <Upload
                        listType="picture"
                        maxCount={1}
                        showUploadList={true}
                        customRequest={handleUpload}
                        fileList={previewImage}
                        onChange={({fileList}) => setPreviewImage(fileList)}
                    >
                        <Button>
                            Chọn ảnh
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item name='email_nguoi_dung' label='Email' rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='mat_khau_nguoi_dung' label='Mật khẩu' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu'}]} hidden={!!editingUser}>
                    <Input type="password" />
                </Form.Item>
                <Form.Item name='sdt_nguoi_dung' label='Số điện thoại' rules={[{ required: true }, { pattern: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='dia_chi_nguoi_dung' label='Địa chỉ' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name='vai_tro' label='Vai trò' rules={[{ required: true, message: 'Vui lòng nhập vai trò'}]} hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="token" label="Token" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="create_at" label="Ngày tạo" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="update_at" label="Ngày cập nhật" hidden>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={() => handleCreate()}>
                Thêm người dùng
            </Button>
            <Search
                placeholder="Hãy nhập gì đó ..."
                allowClear
                enterButton="Tìm kiếm"
                size="middle"
                onSearch={(value) => setSearchKeyWord(value)}
                style={{ width: 500 }}
            />
        </Space>
        <Table 
            columns={columns}
            dataSource={filterData}
            loading={loading}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: filterData.length,
                onChange: (page, pageSize) => {
                    setPagination({ current: page, pageSize: pageSize || 6})
                }
            }}
            bordered
        />
        </>
    );
};

export default UserManager;