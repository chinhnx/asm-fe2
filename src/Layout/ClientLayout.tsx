import { Layout, Menu, MenuProps, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, UserCircle } from 'lucide-react';
import { LoginOutlined, AppstoreOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function Client() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const userData = localStorage.getItem('token');
      setIsLoggedIn(!!userData);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const items: MenuItem[] = [
    {
      key: '/',
      icon: <Home size={16} />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: 'products',
      icon: <ShoppingBag size={16} />,
      label: <Link to="/products">Products</Link>,
    },
    {
      key: 'category',
      icon: <AppstoreOutlined />,
      label: 'Danh mục',
      children: [
        { key: 'category/smartphone', label: <Link to="/category/smartphone">Smartphone</Link> },
        { key: 'category/laptops', label: <Link to="/category/laptops">Laptops</Link> },
        { key: 'category/tablet', label: <Link to="/category/tablet">Tablet</Link> },
      ],
    },
  ];

  const items2: MenuItem[] = [
    {
      key: 'cart',
      icon: <ShoppingCart size={16} />,
      label: <Link to="/cart">Cart</Link>,
    },
    {
      key: isLoggedIn ? 'profile' : 'login',
      icon: isLoggedIn ? <UserCircle size={16} /> : <LoginOutlined />,
      label: <Link to={isLoggedIn ? "/profile" : "/login"}>
        {isLoggedIn ? 'Profile' : 'Login'}
      </Link>,
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <div>
      <Layout>
        {/* header */}
        <Header 
          style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 1000, 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}
        >
          <div 
            className="demo-logo" 
            style={{ 
              color: 'white', 
              marginRight: '24px', 
              fontSize: '20px', 
              fontWeight: 'bold', 
              display: 'flex', 
              gap: 20 
            }}
          >
            <div>SHOP</div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['/']}
              items={items}
              onClick={handleMenuClick}
              style={{ flex: 1, minWidth: 1000 }}
            />  
          </div>
          <div>
            <Menu
              theme="dark"
              mode="horizontal"
              items={items2}
              onClick={handleMenuClick}
              style={{ flex: 1, minWidth: 0 }}
            />
          </div>
        </Header>

        {/* content */}
        <Content 
          style={{ 
            minHeight: '100vh', 
            width: '100%', 
            background: colorBgContainer 
          }}
        >
          <Outlet />
        </Content>

        {/* footer */}
        <Footer 
          style={{
            textAlign: 'center',
            color: '#fff',
            backgroundColor: '#12e508',
          }}
        >
          Shop ©{new Date().getFullYear()} Created by Your Company
        </Footer>
      </Layout>
    </div>
  );
}

export default Client;
