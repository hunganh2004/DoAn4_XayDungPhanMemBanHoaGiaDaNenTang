
import { useEffect, useState } from "react"
import { getAllProducts, deleteProduct, updateProduct, createProduct } from "../services/productService"
import { currencyFormat } from "../utils/currencyFormat"
import { Table, Image, Button, Space, Popconfirm } from "antd"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { host } from "../services/host"
import { Product } from "../types/Product";
import { ColumnsType } from "antd/es/table";

const ProductManager = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        setTimeout(async () => {
            const data = await getAllProducts()
            console.log(data)
            setData(data)
            setLoading(false)
        }, 1000)
    }, [])

    const colums: ColumnsType<Product> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'ten_san_pham',
            key: 'ten_san_pham'
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'gia_san_pham',
            key: 'gia_san_pham',
            render: (gia_san_pham: number) => `${currencyFormat(gia_san_pham)}`
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'anh_san_pham',
            key: 'anh_san_pham',
            align: 'center',
            render: (anh_san_pham: string) => (
                <Image 
                    width={64}
                    src={host + anh_san_pham}
                    alt='Ảnh sản phẩm'
                    style={{ borderRadius: 8 }}
                />
            )
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
    const handleCreate = (newRecord: Product) => {
        // Mở modal
    }

    const handleEdit = (record: Product) => {
        // Mở modal
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

    return (
        <Table 
            columns={colums}
            dataSource={data}
            loading={loading}
            pagination={{ pageSize: 6}}
            bordered
        />
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