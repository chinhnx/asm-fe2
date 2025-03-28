import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Modal, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// Hàm lấy dữ liệu user từ localStorage
const fetchUser = async () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const handleLogout = () => {
    localStorage.clear();
    queryClient.invalidateQueries({ queryKey: ["user"] }); 
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
        <Button type="primary" danger onClick={confirmLogout} style={{ marginTop: 16 }}>
          Đăng xuất
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
