import { useEffect, useState } from "react";
import { Button, Table, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const Order = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user?.id; // Lấy userId từ localStorage

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    axios.get(`http://localhost:3000/orders?userId=${userId}`)
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        setLoading(false);
      });
  }, [userId]);

  const columns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    { title: "Tổng tiền", dataIndex: "total", key: "total", render: (total: number) => `${total.toLocaleString()}đ` },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "Hành động",
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
      <Title level={2}>Danh sách đơn hàng của bạn</Title>
      {userId ? (
        <Table columns={columns} dataSource={orders} rowKey="id" pagination={false} loading={loading} />
      ) : (
        <p>Bạn cần đăng nhập để xem đơn hàng.</p>
      )}
    </div>
  );
};

export default Order;
