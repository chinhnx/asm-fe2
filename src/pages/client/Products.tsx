import React from 'react';
import { Typography, Card, Row, Col, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;
const { Meta } = Card;

const Product: React.FC = () => {
  const navigate = useNavigate();

  const getAllProduct = async () => {
    const { data } = await axios.get("http://localhost:3000/products");
    return data.map((product: any, index: number) => ({
      ...product,
      key: product.id || `product-${index}`,
    }));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  if (isLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '24px' }}>Our Products</Title>
      <Row gutter={[24, 24]} justify="center">
        {data?.map((product:any) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} style={{ height: 200, objectFit: 'cover' }} />}
              onClick={() => navigate(`/products/${product.id}`)}
              style={{ borderRadius: '8px' }}
            >
              <Meta
                title={<Title level={5} style={{ margin: 0 }}>{product.name}</Title>}
                description={
                  <div>
                    <p style={{ margin: '8px 0', fontSize: '14px', color: '#666' }}>{product.description}</p>
                    <p style={{ color: '#1890ff', fontWeight: 'bold', fontSize: '16px' }}>${product.price}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Product;
