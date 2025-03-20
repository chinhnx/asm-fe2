import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingBag size={32} />,
      title: 'Wide Selection',
      description: 'Browse through our extensive collection of premium products'
    },
    {
      icon: <Truck size={32} />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and efficiently'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure Shopping',
      description: 'Shop with confidence with our secure payment system'
    },
    {
      icon: <Clock size={32} />,
      title: '24/7 Support',
      description: 'Our customer service team is always here to help'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }} 
        />
        <div style={{ padding: '0 48px', position: 'relative', zIndex: 1, width: '100%' }}>
          <Title style={{ color: 'white', marginBottom: 24 }}>Welcome to Our Electronics Shop</Title>
          <Paragraph style={{ color: 'white', fontSize: '18px', marginBottom: 32 }}>
            Discover the latest in technology and electronics. From smartphones to smart home devices,
            we have everything you need to stay connected and entertained.
          </Paragraph>
          <Button type="primary" size="large" onClick={() => navigate('/products')}>
            Shop Now
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '64px 48px', background: '#f5f5f5' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
          Why Choose Us
        </Title>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card style={{ textAlign: 'center', height: '100%' }}>
                <div style={{ color: '#1890ff', marginBottom: 16 }}>
                  {feature.icon}
                </div>
                <Title level={4}>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;