import React from 'react';
import { Typography, Table, Button, InputNumber, Empty, Card, Space } from 'antd';
import { Trash2 } from 'lucide-react';

const { Title } = Typography;

// Mock cart data - replace with real data later
const cartItems = [
  {
    id: 1,
    name: "4K Smart TV",
    price: 799.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500"
  },
  {
    id: 2,
    name: "Gaming Laptop",
    price: 1299.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500"
  }
];

const Cart: React.FC = () => {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
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
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => (
        <InputNumber 
          min={1} 
          max={10} 
          defaultValue={quantity} 
          onChange={(value) => console.log(value)}
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (record: any) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button 
          type="text" 
          danger 
          icon={<Trash2 size={16} />}
          onClick={() => console.log('Remove item')}
        />
      ),
    },
  ];

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ padding: '24px 48px' }}>
      <Title level={1}>Shopping Cart</Title>
      
      {cartItems.length > 0 ? (
        <>
          <Table 
            columns={columns} 
            dataSource={cartItems}
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
                <Button type="primary" block size="large">
                  Proceed to Checkout
                </Button>
                <Button block>
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
          <Button type="primary" size="large">
            Start Shopping
          </Button>
        </Empty>
      )}
    </div>
  );
};

export default Cart;