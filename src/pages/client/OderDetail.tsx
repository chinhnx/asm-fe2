import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from "dayjs";
import {
  Card,
  Table,
  Typography,
  Descriptions,
  Spin,
  Empty,
  Tag,
  Row,
  Col,
} from 'antd';

const { Title, Text } = Typography;

const statusColors: Record<string, string> = {
  'Đang xử lý': 'blue',
  'Đã xác nhận': 'cyan',
  'Đang giao': 'orange',
  'Hoàn thành': 'green',
  'Hủy': 'red',
};

const OderDetailClient = () => {
  const { id } = useParams();

  const getOderDetail = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`http://localhost:3000/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  };

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: getOderDetail,
  });

  if (isLoading) return <Spin fullscreen tip="Đang tải đơn hàng..." />;
  if (isError || !order) return <Empty description="Không tìm thấy đơn hàng!" />;

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={record.image}
            alt={text}
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: 8,
              border: '1px solid #eee'
            }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()}đ`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tổng cộng',
      key: 'total',
      render: (record: any) => `${(record.price * record.quantity).toLocaleString()}đ`,
    },
  ];

  return (
    <div style={{ padding: '32px 48px' }}>
      <Title level={3}>Chi tiết đơn hàng #{order.id}</Title>

      <Row gutter={24}>
        <Col span={16}>
          <Card bordered style={{ marginBottom: 24 }}>
          <Descriptions title="Thông tin khách hàng" column={2}>
  <Descriptions.Item label="Họ tên">{order.name}</Descriptions.Item>
  <Descriptions.Item label="User ID">{order.userId}</Descriptions.Item>
  <Descriptions.Item label="Ngày đặt">
    {dayjs(order.createdAt).format("HH:mm:ss - DD/MM/YYYY")}
  </Descriptions.Item>
  <Descriptions.Item label="Trạng thái">
    <Tag color={statusColors[order.status] || 'default'}>
      {order.status}
    </Tag>
  </Descriptions.Item>
</Descriptions>

          </Card>

          <Card bordered title="Danh sách sản phẩm">
            <Table
              columns={columns}
              dataSource={order.items}
              rowKey="productId"
              pagination={false}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title="Tóm tắt đơn hàng"
            style={{ border: '1px solid #f0f0f0' }}
            headStyle={{ fontWeight: 'bold' }}
          >
            <Descriptions column={1} layout="vertical">
              <Descriptions.Item label="Tạm tính">
                <Text strong>{order.total.toLocaleString()}đ</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Phí vận chuyển">
                Miễn phí
              </Descriptions.Item>
              <Descriptions.Item label="Tổng thanh toán">
                <Title level={4} style={{ margin: 0 }}>
                  {order.total.toLocaleString()}đ
                </Title>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OderDetailClient;
