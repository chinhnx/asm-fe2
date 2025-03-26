import React, { useState, useEffect } from 'react';
import { Typography, Table, Button, InputNumber, Empty, Card, Space } from 'antd';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Import useCart

const { Title } = Typography;

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Redirecting to payment gateway...");
    clearCart();
    navigate("/checkout"); // Chuyển đến trang thanh toán
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text:any, record:any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src={record.image} 
            alt={text} 
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price:number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_:any, record:any) => (
        <InputNumber 
          min={1} 
          max={10} 
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value)}
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (record:any) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:any) => (
        <Button 
          type="text" 
          danger 
          icon={<Trash2 size={16} />}
          onClick={() => removeFromCart(record.id)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '24px 48px' }}>
      <Title level={1}>Shopping Cart</Title>
      
      {cart.length > 0 ? (
        <>
          <Table 
            columns={columns} 
            dataSource={cart}
            pagination={false}
            rowKey="id"
          />
          
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <Card style={{ width: '300px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" block size="large" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button block onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
              </Space>
            </Card>
          </div>
        </>
      ) : (
        <Empty
          description="Your cart is empty"
          style={{ margin: '48px 0' }}
        >
          <Button type="primary" size="large" onClick={() => navigate('/products')}>
            Start Shopping
          </Button>
        </Empty>
      )}
    </div>
  );
};

export default Cart;
