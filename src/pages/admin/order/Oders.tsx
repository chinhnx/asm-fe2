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

        // Map userId từ orders -> userName từ users
        const userMap = usersData.reduce((acc: any, user: any) => {
          acc[user.id] = user.name; // Lưu userId -> name
          return acc;
        }, {});

        // Gán tên user vào từng đơn hàng
        const updatedOrders = ordersData.map((order: any) => ({
          ...order,
          userName: userMap[order.userId] || "Không xác định",
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
    { title: "Tổng tiền", dataIndex: "total", key: "total", render: (total: number) => `${total.toLocaleString()}đ` },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "Cập nhật trạng thái",
      key: "updateStatus",
      render: (order: any) => {
        const isDisabled = order.status === "Hoàn thành" || order.status === "Hủy"; // Không cho đổi nếu đã hoàn thành hoặc hủy
        return (
          <Select
            defaultValue={order.status}
            style={{ width: 150 }}
            onChange={(value) => updateOrderStatus(order.id, value)}
            disabled={isDisabled} // Không cho phép chọn lại nếu đã Hoàn thành hoặc Hủy
          >
            <Option value="Đang xử lý">Đang xử lý</Option>
            <Option value="Đã xác nhận">Đã xác nhận</Option>
            <Option value="Đang giao">Đang giao</Option>
            <Option value="Hoàn thành">Hoàn thành</Option>
            <Option value="Hủy">Hủy</Option>
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
            <Link to={`/order-detail/${order.id}`}>Xem</Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Quản lý đơn hàng</Title>
      <Table columns={columns} dataSource={orders} rowKey="id" pagination={false} loading={loading} />
    </div>
  );
};

export default OrderList;
