
import { useEffect, useState } from "react"
import { getAllProducts, deleteProduct, updateProduct, createProduct } from "../services/productService"
import { getAllCategories } from "../services/categoryService"
import { getAllSuppliers } from "../services/supplierService"
import { currencyFormat } from "../utils/currencyFormat"
import { uploadSingleImage } from "../services/upload"
import { Table, Image, Button, Space, Popconfirm, Modal, Form, Input, InputNumber, Upload, Select } from "antd"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { host } from "../services/host"
import { Product } from "../types/Product";
import { Category } from "../types/Category"
import { ColumnsType } from "antd/es/table";
import { UploadFile } from 'antd/es/upload/interface';

const ProductManager = () => {
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [categoryOptions, setCategoryOptions] = useState<Option[]>([])
    const [supplierOptions, setSupplierOptions] = useState<Option[]>([])
    const [previewImage, setPreviewImage] = useState<UploadFile[]>([])
    const [searchKeyWord, setSearchKeyWord] = useState<string>('')
    const { Search } = Input;
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6 })


    type Option = {
        label: string;
        value: number;
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(async () => {
            const data = await getAllProducts()
            console.log(data)
            setData(data)
            setLoading(false)
        }, 1000)
        
        setTimeout(async () => {
            const res = await getAllCategories()
            setCategoryOptions(res.map(
                (cat: Category) => (
                    { 
                        label: cat.ten_loai_san_pham, 
                        value: cat.id 
                    }
                ))
            )
        }, 1000)

        setTimeout(async () => {
            const res = await getAllSuppliers()
            setSupplierOptions(res.map(
                (sup: any) => (
                    { 
                        label: sup.ten_nha_cung_cap, 
                        value: sup.id 
                    }
                ))
            )
        }, 1000)
    }, [])

    const colums: ColumnsType<Product> = [
        {
            title: 'STT',
            // dataIndex: 'id',
            // key: 'id',
            align: 'center',
            render: (_: unknown, p: unknown, index: number) => (pagination.current - 1) * pagination.pageSize + index + 1
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'ten_san_pham',
            key: 'ten_san_pham'
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'anh_san_pham',
            key: 'anh_san_pham',
            align: 'center',
            render: (anh_san_pham: string) => (
                <Image 
                    width={64}
                    height={64}
                    src={host + anh_san_pham}
                    alt='Ảnh sản phẩm'
                    style={{ borderRadius: 8 }}
                />
            )
        },
        {
            title: 'Mô tả chi tiết',
            dataIndex: 'mo_ta_san_pham',
            key: 'mo_ta_san_pham'
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'gia_san_pham',
            key: 'gia_san_pham',
            render: (gia_san_pham: number) => `${currencyFormat(gia_san_pham)}`
        },
        {
            title: 'Số lượng tồn',
            dataIndex: 'so_luong_ton',
            key: 'so_luong_ton'
        },
        {
            title: 'Sửa',
            key: 'edit',
            align: 'center',
            width: 50,
            render: (_: unknown, record: Product) => (
                <Button
                    type='link'
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
            render: (_: unknown, record: Product) => (
                <Popconfirm
                    title='Bạn có chắc muốn xóa sản phẩm này ?'
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

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            console.log('Form values:', values)
            setLoading(true)

            if (editingProduct) {
                await updateProduct(values)
            } else {
                await createProduct(values)
            }
            const updateList = await getAllProducts()
            setData(updateList)
            setIsModalOpen(false)
        } catch (err) { 
            console.error('Lỗi khi thêm/sửa sản phẩm: ' + err)
        } finally {
            setLoading(false)
            setIsModalOpen(false)
            form.resetFields()
            setPreviewImage([]);
        }
    }

    const handleUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;
        try {
            const response = await uploadSingleImage(file);
            form.setFieldsValue({ anh_san_pham: response });
            console.log('Upload thành công:', form.getFieldValue('anh_san_pham'));
            onSuccess(response);
        } catch (err) {
            console.error('Lỗi khi upload ảnh: ' + err);
            onError(err);
        }
    }

    const handleCreate = () => {
        // Mở modal
        setEditingProduct(null)
        form.setFieldsValue({
            ten_san_pham: '',
            gia_san_pham: '',
            anh_san_pham: '',
            mo_ta_san_pham: '',
            so_luong_ton: '',
            ma_loai_san_pham: '',
            ma_nha_cung_cap: '',
            create_at: new Date().toISOString(),
            update_at: new Date().toISOString(),
        })
        setIsModalOpen(true)
    }

    const handleEdit = (record: Product) => {
        // Mở modal
        setEditingProduct(record)
        form.setFieldsValue(record)

        // Tạo fileList từ ảnh cũ
        const fileList: UploadFile[] = [
            {
                uid: '-1',
                name: record.anh_san_pham.split('/').pop() || 'image.jpg',
                status: 'done',
                url: host + record.anh_san_pham,
                thumbUrl: host + record.anh_san_pham,
            }
        ]
        setPreviewImage(fileList)
        setIsModalOpen(true)
    }

    const handleDelete = async (id: number) => {
        try {
            setLoading(true)
            await deleteProduct(id)
            const updateList = await getAllProducts()
            setData(updateList)
        } catch (err) {
            console.error('Lỗi khi xóa sản phẩm: ' + err)
        } finally {
            setLoading(false)
        }
    }

    const filteredData = data.filter((item:Product) => (
        item.ten_san_pham.toLocaleLowerCase().includes(searchKeyWord.toLocaleLowerCase())
        || item.mo_ta_san_pham.toLocaleLowerCase().includes(searchKeyWord.toLocaleLowerCase())
        || item.gia_san_pham.toString().includes(searchKeyWord)
        || item.so_luong_ton.toString().includes(searchKeyWord)
        || item.id.toString().includes(searchKeyWord)
    ))

    return (
        <>
        <Modal
            title={editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
            open={isModalOpen}
            onCancel={() => {
                setIsModalOpen(false);
                // form.resetFields();
                setPreviewImage([]);
            }}
            onOk={handleSubmit}
            okText={editingProduct ? 'Lưu' : 'Thêm'}
            cancelText='Hủy'
            confirmLoading={loading}
            width="50%"
            style={{ top: 0 }}
            >
            <Form form={form} layout="vertical">
                <Form.Item name="id" label="ID" hidden>
                    <InputNumber style={{ width: '100%' }} disabled />
                </Form.Item>
                <Form.Item name="ten_san_pham" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="gia_san_pham" label="Giá sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}>
                    <InputNumber 
                        style={{ width: '100%' }} 
                        min={0} 
                        formatter={(value: number | undefined) => value? currencyFormat(value):''}
                        parser={(value: string | undefined) => value ? Number(value.replace(/[₫.]/g, '')) : 0}
                    />
                </Form.Item>
                <Form.Item name="mo_ta_san_pham" label="Mô tả chi tiết" rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết sản phẩm' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item 
                    name="anh_san_pham" 
                    label="Ảnh sản phẩm" 
                    valuePropName="fileImage"
                    rules={[{ required: true, message: 'Vui lòng tải ảnh sản phẩm' }]}
                    getValueFromEvent={() => form.getFieldValue('anh_san_pham') }
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
                <Form.Item name="so_luong_ton" label="Số lượng tồn" rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn' }]}>
                    <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
                <Form.Item name="ma_loai_san_pham" label="Loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập mã loại sản phẩm' }]}>
                    <Select 
                        options={categoryOptions}
                        placeholder="Chọn loại sản phẩm"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item name="ma_nha_cung_cap" label="Nhà cung cấp" rules={[{ required: true, message: 'Vui lòng nhập mã nhà cung cấp' }]}>
                    <Select 
                        options={supplierOptions}
                        placeholder="Chọn nhà cung cấp"
                        style={{ width: '100%' }}
                    />
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
                Thêm sản phẩm
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
            dataSource={filteredData}
            loading={loading}
            pagination={{ 
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: filteredData.length,
                onChange: (page, pageSize) => 
                    setPagination({ current: page, pageSize: pageSize || 6 })
            }}
            bordered
        />
        </>
    )
}
/*
export interface Product {
    id: number,
    ten_san_pham: string,
    gia_san_pham: number,
    anh_san_pham: string,
    so_luong_ton: number,
    ma_loai_san_pham: number,
    ma_nha_cung_cap: number,
    create_at: string,
    update_at: string,
}
*/


export default ProductManager