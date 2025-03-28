import  { useEffect, useState } from "react";
import { Button, Card, Modal, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

  useEffect(() => {
    // Lấy dữ liệu user từ localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData)); // Chuyển JSON thành Object
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const confirmLogout = () => {
    Modal.confirm({
      title: "Xác nhận đăng xuất",
      content: "Bạn có chắc chắn muốn đăng xuất?",
      okText: "Có",
      okType: "danger",
      cancelText: "Hủy",
      onOk: handleLogout,
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Card
        style={{ width: 400, textAlign: "center", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      >
        <Title level={3}>Thông tin cá nhân</Title>
        {user ? (
          <>
            <Text strong>Họ và tên:</Text> <Text>{user.name}</Text>
            <br />
            <Text strong>Email:</Text> <Text>{user.email}</Text>
            <br />
            <Text strong>Số điện thoại:</Text> <Text>{user.phone}</Text>
            <br />
          </>
        ) : (
          <Text type="danger">Không có dữ liệu người dùng</Text>
        )}
         <Button type="primary"  style={{ marginTop: 16 }}>
         <Link to="/order">  Don hàng</Link>
        </Button>
        <Button type="primary" danger onClick={confirmLogout} style={{ marginTop: 16 }}>
          Đăng xuất
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
