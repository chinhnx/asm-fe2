import React from 'react';
import { Typography, Card, Spin, Tag, Button, Row, Col } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useCart } from './CartContext';
// import { useCart } from '../../context/CartContext'; // Import useCart

const { Title, Paragraph } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Lấy hàm addToCart từ context

  const getProductDetail = async () => {
    const { data } = await axios.get(`http://localhost:3000/products/${id}`);
    return data;
  };

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: getProductDetail,
  });

  if (isLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '24px' }}>
        <Title level={1}>Product Not Found</Title>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Button 
        icon={<ArrowLeft size={16} />} 
        onClick={() => navigate('/products')}
        style={{ marginBottom: '24px' }}
      >
        Back to Products
      </Button>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover' }} 
          />
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2}>{product.name}</Title>
            <Tag color="blue" style={{ marginBottom: '16px' }}>{product.category}</Tag>
            <Paragraph>{product.description}</Paragraph>
            <Title level={3} style={{ color: '#1890ff' }}>${product.price.toFixed(2)}</Title>
            <Button 
              type="primary" 
              size="large" 
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                });
                navigate('/cart'); // Chuyển hướng đến trang giỏ hàng
              }}
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
