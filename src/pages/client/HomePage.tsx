import React from 'react';
import { Layout, Menu, Typography, Row, Col, Card, Button, theme } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, Truck, Shield, Clock } from 'lucide-react';
import ProductDetail from '../../pages/client/ProductDetail';
import Product from './Products';
import Cart from './Cart';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    { key: '/', icon: <Home size={16} />, label: 'Home' },
    { key: '/products', icon: <ShoppingBag size={16} />, label: 'Products' },
    { key: '/cart', icon: <ShoppingCart size={16} />, label: 'Cart' },
  ];

  const features = [
    { icon: <ShoppingBag size={32} />, title: 'Wide Selection', description: 'Browse through our extensive collection of premium products' },
    { icon: <Truck size={32} />, title: 'Fast Delivery', description: 'Get your orders delivered quickly and efficiently' },
    { icon: <Shield size={32} />, title: 'Secure Shopping', description: 'Shop with confidence with our secure payment system' },
    { icon: <Clock size={32} />, title: '24/7 Support', description: 'Our customer service team is always here to help' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      {/* Header */}
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', marginRight: '24px', fontSize: '20px', fontWeight: 'bold' }}>
          SHOP
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          items={menuItems}
          onClick={(e) => navigate(e.key)}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      {/* Content */}
      <Content style={{ background: colorBgContainer }}>
        {/* Hero Section */}
        <div
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
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
          <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>Why Choose Us</Title>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card style={{ textAlign: 'center', height: '100%' }}>
                  <div style={{ color: '#1890ff', marginBottom: 16 }}>{feature.icon}</div>
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph>{feature.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Dynamic Routes */}
        
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>Shop ©{new Date().getFullYear()} Created by Your Company</Footer>
    </Layout>
  );
};

export default HomePage;
