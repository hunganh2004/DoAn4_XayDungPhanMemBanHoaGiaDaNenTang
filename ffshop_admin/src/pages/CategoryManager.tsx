import { useEffect, useState } from "react";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../services/categoryService";
import { uploadSingleImage } from "../services/upload";
import { Table, Image, Button, Space, Popconfirm, Modal, Form, Input, InputNumber, Upload } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { host } from "../services/host";
import { Category } from "../types/Category";
import { ColumnsType } from "antd/es/table";
import { UploadFile } from 'antd/es/upload/interface';

const CategoryManager = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [previewImage, setPreviewImage] = useState<UploadFile[]>([])
    const [searchKeyWord, setSearchKeyWord] = useState<string>('')
    const { Search } = Input
    const [pagination, setPagination] = useState({current: 1, pageSize: 6})
    const [form] = Form.useForm()

    useEffect(() => {
        setLoading(true)
        setTimeout(async () => {
            const data = await getAllCategories()
            setCategories(data)
            setLoading(false)
        }, 1000)
    }, [])

    const colums: ColumnsType<Category> = [
        {
            title: 'STT',
            align: 'center',
            render: (_: unknown, c: unknown, index: number) => (
                (pagination.current - 1) *  pagination.pageSize + index + 1
            ),
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'ten_loai_san_pham',
            key: 'ten_loai_san_pham',
        },
        {
            dataIndex: 'anh_loai_san_pham',
            key:'anh_loai_san_pham',
            title: 'Ảnh loại sản phẩm',
            align: 'center',
            render: (anh_loai_san_pham: string) => (
                <Image 
                    width={64}
                    height={64}
                    src={host + anh_loai_san_pham}
                    alt="Ảnh danh mục"
                    style={{ borderRadius: 8}}
                />
            )
        },
        {
            title: 'Sửa',
            key: 'edit',
            align: 'center',
            width: 50,
            render: (_: unknown, record: Category) => (
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
            render: (_: unknown, record: Category) => (
                <Popconfirm
                    title='Bạn có chắc muốn xóa danh mục này ?'
                    onConfirm={() => handleDelete(record.id)}
                    okText='Xóa'
                    cancelText='Hủy'
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

    const handleEdit = (record: Category) => {
        setEditingCategory(record)
        form.setFieldsValue(record)

        const fileList: UploadFile[] = [
            {
                uid: '-1',
                name: record.anh_loai_san_pham.split('/').pop() || 'image.jpg',
                status: 'done',
                url: host + record.anh_loai_san_pham,
                thumbUrl: host + record.anh_loai_san_pham
            }
        ]

        setPreviewImage(fileList)
        setIsModalOpen(true)
    }

    const handleDelete = async (id: number) => {
        try {
            setLoading(true)
            await deleteCategory(id)
            const updateList = await getAllCategories()
            setCategories(updateList)
        } catch (err) {
            console.error('Lỗi khi xóa danh mục: ' + err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = () => {
        setEditingCategory(null)
        form.setFieldsValue({
            ten_loai_san_pham: '',
            anh_loai_san_pham: '',
            create_at: new Date().toISOString(),
            update_at: new Date().toISOString(),
        })
        setIsModalOpen(true)
    }

    const handleUpload = async (options: any) => {
        const { file, onSuccess, onError} = options
        try {
            const response = await uploadSingleImage(file)
            form.setFieldsValue({ anh_loai_san_pham: response})
            onSuccess(response)
        } catch (err) {
            console.error('Lỗi khi upload ảnh: ' + err);
            onError(err);
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            console.log(values)
            setLoading(true)

            if (editingCategory) {
                await updateCategory(values)
            } else {
                await createCategory(values)
            }
            const updateList = await getAllCategories()
            setCategories(updateList)
            setIsModalOpen(false)
        } catch (err) {
            console.error('Lỗi khi thêm/sửa sản phẩm: ' + err)
        } finally {
            setLoading(false)
            setIsModalOpen(false)
            form.resetFields()
            setPreviewImage([])
        }
    }

    const filterData = categories.filter((item: Category) => (
        item.id.toString().includes(searchKeyWord) ||
        item.ten_loai_san_pham.toLocaleLowerCase().includes(searchKeyWord.toLocaleLowerCase())
    ))
    
    return (
        <>
        <Modal
            title={editingCategory? 'Sửa danh mục' : 'Thêm danh mục'}
            open={isModalOpen}
            onCancel={() => {
                setIsModalOpen(false)
                // form.resetFields()
                setPreviewImage([])
            }}
            onOk={handleSubmit}
            okText={editingCategory ? 'Lưu' : 'Thêm'}
            cancelText='Hủy'
            confirmLoading={loading}
            width='50%'
        >
            <Form form={form} layout="vertical">
                <Form.Item name='id' label='ID' hidden>
                    <InputNumber style={{ width: '100%'}} disabled />
                </Form.Item>
                <Form.Item name='ten_loai_san_pham' label='Tên danh mục' rules={[{ required: true, message: 'Vui lòng nhập tên danh mục'}]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="anh_loai_san_pham"
                    label="Ảnh danh mục"
                    valuePropName="fileImage"
                    rules={[{ required: true, message: 'Vui lòng tải ảnh danh mục'}]}
                    getValueFromEvent={() => form.getFieldValue('anh_loai_san_pham')}
                    required
                >
                    <Upload
                        name="fileImage"
                        listType="picture"
                        maxCount={1}
                        showUploadList={true}
                        customRequest={handleUpload}
                        fileList={previewImage}
                        onChange={({ fileList }) => setPreviewImage(fileList)}
                    >
                        <Button>Chọn ảnh</Button>
                    </Upload>
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
                Thêm danh mục
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
            columns={colums}
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
    )
}

export default CategoryManager