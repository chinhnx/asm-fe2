import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Typography, Spin, Empty } from "antd";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const { Title } = Typography;

const Dashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/orders");
        setOrders(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Spin fullscreen tip="Đang tải dữ liệu..." />;
  if (!orders.length) return <Empty description="Không có đơn hàng nào" />;

  const completedOrders = orders.filter(order => order.status === "Hoàn thành");

  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

  const ordersByMonth = Array(12).fill(0);
  completedOrders.forEach(order => {
    const month = new Date(order.createdAt).getMonth(); // 0-11
    ordersByMonth[month] += order.total;
  });

  const chartData = ordersByMonth.map((total, index) => ({
    month: `Tháng ${index + 1}`,
    revenue: Number(total.toFixed(2)),
  }));

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Thống kê doanh thu</Title>

      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng đơn hàng" value={orders.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Đơn đã hoàn thành"
              value={completedOrders.length}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue.toLocaleString("vi-VN")}
              suffix="đ"
            />
          </Card>
        </Col>
      </Row>

      <Card title="Doanh thu theo tháng" style={{ marginTop: 32 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value.toLocaleString("vi-VN")}đ`} />
            <Bar dataKey="revenue" fill="#1890ff" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;
