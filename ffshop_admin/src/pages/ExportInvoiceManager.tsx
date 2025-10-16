import { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, Modal, Input, Tag, Select } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { getAllSalesInvoices, deleteSalesInvoice, getSalesInvoiceDetail , updateSalesInvoiceStatus} from "../services/salesInvoiceServices";
import { getAllUsers } from "../services/userService";
import { getAllProducts } from "../services/productService";
import { SalesInvoice } from "../types/SalesInvoice";
import { SalesInvoiceDetail } from "../types/SalesInvoiceDetail";
import { User } from "../types/User";
import { Product } from "../types/Product";
import { currencyFormat } from "../utils/currencyFormat";
import { ColumnsType } from "antd/es/table";

const ExportInvoiceManager = () => {
    // const [data, setData] = useState<SalesInvoice[]>([]);
    const [bills, setBills] = useState<Bill[]>([]);
    const [billDetails, setBillDetails] = useState<BillDetail[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    // const [invoiceDetails, setInvoiceDetails] = useState<SalesInvoiceDetail[]>([]);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);

    interface Bill extends SalesInvoice {
        ten_nguoi_dung: string
        dia_chi_nguoi_dung: string
        sdt_nguoi_dung: string
        email_nguoi_dung: string
    }

    interface BillDetail extends SalesInvoiceDetail {
        ten_san_pham: string
    }

    useEffect(() => {
        fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchInvoices = async () => {
        setLoading(true);
        const invoices = await getAllSalesInvoices();
        const users = await getAllUsers();

        const billsWithUserInfo: Bill[] = invoices.map((invoice: SalesInvoice) => {
            const user = users.find((u: User) => u.id === invoice.ma_nguoi_dung);
            return {
            ...invoice,
            ten_nguoi_dung: user?.ten_nguoi_dung || "",
            dia_chi_nguoi_dung: user?.dia_chi_nguoi_dung || "",
            sdt_nguoi_dung: user?.sdt_nguoi_dung || "",
            email_nguoi_dung: user?.email_nguoi_dung || "",
            };
        });

        setBills(billsWithUserInfo);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);
        await deleteSalesInvoice(id);
        await fetchInvoices();
        setLoading(false);
    };

    const handleViewDetails = async (invoiceId: number) => {
        setSelectedInvoiceId(invoiceId);
        const details = await getSalesInvoiceDetail(invoiceId);
        const products = await getAllProducts();

        const detailsWithProductName: BillDetail[] = details.map((detail: SalesInvoiceDetail) => {
            const product = products.find((p: Product) => p.id === detail.ma_san_pham);
            return {
            ...detail,
            ten_san_pham: product?.ten_san_pham || "",
            };
        });

        setBillDetails(detailsWithProductName);
        setDetailModalOpen(true);

    };

    const filteredData = bills.filter((item) =>
        item.id.toString().includes(searchKeyword) ||
        item.ten_nguoi_dung.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.dia_chi_nguoi_dung.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.sdt_nguoi_dung.includes(searchKeyword) ||
        item.trang_thai.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.ghi_chu.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.tong_tien.toString().includes(searchKeyword)
    );

    const columns: ColumnsType<Bill> = [
        { title: "Mã hóa đơn", dataIndex: "id", key: "id", align: "center" },
        { title: "Tên khách hàng", dataIndex: "ten_nguoi_dung", key: "ten_nguoi_dung" },
        { title: "SĐT", dataIndex: "sdt_nguoi_dung", key: "sdt_nguoi_dung" },
        { title: "Địa chỉ", dataIndex: "dia_chi_nguoi_dung", key: "dia_chi_nguoi_dung" },
        { title: "Ngày bán", dataIndex: "ngay_ban", key: "ngay_ban" },
        { title: "Tổng tiền", dataIndex: "tong_tien", key: "tong_tien", render: currencyFormat },
        {
            title: "Trạng thái", dataIndex: "trang_thai", key: "trang_thai",
            render: (status: string) => {
            const color = status === "Đã thanh toán" ? "green" :
                            status === "Chưa thanh toán" ? "red" :
                            status === "Đang vận chuyển" ? "blue" :
                            status === "Đã hoàn thành" ? "gold" : "default";
            return <Tag color={color}>{status}</Tag>;
            }
        },
        { title: "Ghi chú", dataIndex: "ghi_chu", key: "ghi_chu" },
        {
            title: "Chi tiết", key: "detail", align: "center",
            render: (_, record) => (
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record.id)}>Xem</Button>
            )
        },
        {
            title: "Cập nhật trạng thái",
            key: "updateStatus",
            align: "center",
            render: (_, record) => (
                <Select
                defaultValue={record.trang_thai}
                style={{ width: 160 }}
                onChange={async (value) => {
                    await updateSalesInvoiceStatus(record.id, value);
                    fetchInvoices(); // reload lại danh sách
                }}
                options={[
                    { value: "Chưa thanh toán", label: "Chưa thanh toán" },
                    { value: "Đã thanh toán", label: "Đã thanh toán" },
                    { value: "Đang vận chuyển", label: "Đang vận chuyển" },
                    { value: "Đã hoàn thành", label: "Đã hoàn thành" },
                ]}
                />
            )
        },
        {
            title: "Xóa", key: "delete", align: "center",
            render: (_, record) => (
            <Popconfirm
                title="Bạn có chắc muốn xóa hóa đơn này?"
                onConfirm={() => handleDelete(record.id)}
                okText="Xóa"
                cancelText="Hủy"
            >
                <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
            </Popconfirm>
            )
        },
    ];


    const detailColumns: ColumnsType<BillDetail> = [
        { title: "Mã sản phẩm", dataIndex: "ma_san_pham", key: "ma_san_pham" },
        { title: "Tên sản phẩm", dataIndex: "ten_san_pham", key: "ten_san_pham" },
        { title: "Số lượng", dataIndex: "so_luong", key: "so_luong" },
        { title: "Giá bán", dataIndex: "gia_ban", key: "gia_ban", render: currencyFormat },
];


    return (
        <>
        <Modal
            title={`Chi tiết hóa đơn #${selectedInvoiceId}`}
            open={detailModalOpen}
            onCancel={() => setDetailModalOpen(false)}
            footer={null}
            width="60%"
        >
            <Table
            columns={detailColumns}
            dataSource={billDetails}
            rowKey="id"
            pagination={false}
            bordered
            />
        </Modal>
        
        <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            {/* <Button type="primary" onClick={() => openCreateModal()}>
                Thêm hóa đơn
            </Button> */}

            <Input.Search
            placeholder="Tìm kiếm hóa đơn..."
            allowClear
            enterButton="Tìm"
            size="middle"
            onSearch={(value) => setSearchKeyword(value)}
            style={{ width: 400 }}
            />
        </Space>

        <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            loading={loading}
            pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: filteredData.length,
            onChange: (page, pageSize) => setPagination({ current: page, pageSize: pageSize || 6 }),
            }}
            bordered
        />
        </>
    );
};

export default ExportInvoiceManager;