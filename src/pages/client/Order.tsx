import { useEffect, useState } from "react";
import { Button, Card, Modal, Typography, Table, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useList } from "../../hooks";

const Order = () => {
  const { data, isLoading } = useList({ resource: "orders" });



  const columns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    { title: "Tổng tiền", dataIndex: "total", key: "total", render: (total: number) => `${total.toLocaleString()}đ` },
    { title: "Trang thai", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      render: (order: any) => {
        return (
          <Space>
            <Button type="primary">
            <Link to={`/order-detail/${order.id}`}>Xem</Link>
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
            <Table columns={columns} dataSource={data} rowKey="id" pagination={false} loading={isLoading} />
         
  );
};

export default Order;
