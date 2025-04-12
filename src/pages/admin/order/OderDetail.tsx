import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Descriptions, Table, Typography, Spin, Empty, Card } from "antd";

const { Title } = Typography;

const OrderDetail = () => {
  const { id } = useParams();
//   console.log(id);

const fetchOrderDetail = async () => {
    const { data: order } = await axios.get(`http://localhost:3000/orders/${id}`);
    const { data: user } = await axios.get(`http://localhost:3000/users/${order.userId}`);
    const { data: products } = await axios.get(`http://localhost:3000/products`);
  
    // Map productId => productName
    const productMap = products.reduce((acc: any, product: any) => {
      acc[product.id] = product.name;
      return acc;
    }, {});
  
    // Gắn tên sản phẩm vào từng item
    const itemsWithName = order.items.map((item: any) => ({
      ...item,
      productName: productMap[item.productId] || "Không xác định",
    }));
  
    return {
      ...order,
      user,
      items: itemsWithName,
    };
  };
  
  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order-detail", id],
    queryFn: fetchOrderDetail,
  });

  if (isLoading) return <Spin fullscreen tip="Đang tải..." />;
  if (isError || !order) return <Empty description="Không tìm thấy đơn hàng!" />;

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()}đ`,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (record: any) => `${(record.quantity * record.price).toLocaleString()}đ`,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Chi tiết đơn hàng #{order.id}</Title>

      <Card style={{ marginBottom: 24 }}>
        <Descriptions title="Thông tin đơn hàng" bordered>
          <Descriptions.Item label="Trạng thái" span={3}>
            {order.status}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền" span={3}>
            {order.total.toLocaleString()}đ
          </Descriptions.Item>
          <Descriptions.Item label="Ngày đặt" span={3}>
            {new Date(order.createdAt).toLocaleDateString("vi-VN")}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="Thông tin khách hàng" bordered style={{ marginTop: 24 }}>
          <Descriptions.Item label="Tên">{order.user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{order.user.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{order.user.phone || "Chưa có"}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Danh sách sản phẩm">
        <Table
          dataSource={order.items}
          columns={columns}
        //   rowKey={(record) => record.productId}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default OrderDetail;
