import { useEffect, useState } from "react";
import { Button, Table, Space, Typography, Select, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const OrderList = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: ordersData } = await axios.get("http://localhost:3000/orders"); // API lấy đơn hàng
        const { data: usersData } = await axios.get("http://localhost:3000/users"); // API lấy danh sách user
        const { data: productsData } = await axios.get("http://localhost:3000/products"); // API lấy sản phẩm

        // Map userId từ orders -> userName từ users
        const userMap = usersData.reduce((acc: any, user: any) => {
          acc[user.id] = user.name; // Lưu userId -> name
          return acc;
        }, {});

        // Map productId -> product info
        const productMap = productsData.reduce((acc: any, product: any) => {
          acc[product.id] = product;
          return acc;
        }, {});

        // Gán dữ liệu vào đơn hàng
        const updatedOrders = ordersData.map((order: any) => ({
          ...order,
          userName: userMap[order.userId] || "Không xác định",
          products: Array.isArray(order.items) // Chuyển từ 'products' thành 'items'
            ? order.items.map((item: any) => ({
              ...item,
              ...productMap[item.productId], // Lấy thông tin sản phẩm từ danh sách sản phẩm
            }))
            : [], // Nếu items không phải mảng, gán thành []
        }));


        setOrders(updatedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);



  // Hàm cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, { status: newStatus });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái!");
      console.error(error);
    }
  };

  const columns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    { title: "Khách hàng", dataIndex: "userName", key: "userName" },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (products: any[]) => (
        <ul style={{ paddingLeft: 16 }}>
          {products.map((product) => (
            <li key={product.productId}>
              <strong>{product.name}</strong> - {product.quantity} x {product.price.toLocaleString()}đ
            </li>
          ))}
        </ul>
      ),
    },
    { title: "Tổng tiền", dataIndex: "total", key: "total", render: (total: number) => `${total.toLocaleString()}đ` },
    { title: "Phuowng thuc thanh toan", dataIndex: "methodPayment", key: "methodPayment" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "Cập nhật trạng thái",
      key: "updateStatus",
      render: (order: any) => {
        const statuses = ["Đang xử lý", "Đã xác nhận", "Đang giao", "Hoàn thành", "Hủy"];
        const statusColors: { [key: string]: string } = {
          "Đang xử lý": "blue",
          "Đã xác nhận": "green",
          "Đang giao": "orange",
          "Hoàn thành": "gray",
          "Hủy": "red",
        };
        const currentStatusIndex = statuses.indexOf(order.status);
        return (
          <Select
            defaultValue={order.status}
            style={{ width: 150 }}
            onChange={(value) => updateOrderStatus(order.id, value)}
          >
            {statuses.map((status, index) => (
              <Option
                key={status}
                value={status}
                disabled={index < currentStatusIndex}
                style={{ color: statusColors[status] }}
              >
                {status}
              </Option>
            ))}
          </Select>

        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (order: any) => (
        <Space>
          <Button type="primary">
            <Link to={`/admin/order-detail/${order.id}`}>Xem</Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Danh sach đơn hàng</Title>
      <Table columns={columns} dataSource={orders} rowKey="id" pagination={false} loading={loading} />
    </div>
  );
};

export default OrderList;
