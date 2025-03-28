import { Layout, Menu, Modal } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import Sider from "antd/es/layout/Sider";
import { UserOutlined, HomeOutlined, ShopOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate, Outlet } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  // Xử lý đăng xuất
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} style={{ background: "#001529" }}>
        <div
          style={{
            height: "64px",
            color: "white",
            textAlign: "center",
            lineHeight: "64px",
            fontSize: "18px",
          }}
        >
          Admin Panel
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="/admin" icon={<HomeOutlined />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item icon={<ShopOutlined />}>
            <Link to="/admin/product">Product List</Link>
          </Menu.Item>
          <Menu.Item icon={<ShopOutlined />}>
            <Link to="/admin/category">Category List</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            <Link to="/admin/user">User</Link>
          </Menu.Item>

          {/* Thêm nút Đăng xuất */}
          <Menu.Item icon={<LogoutOutlined />} danger onClick={confirmLogout}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            fontSize: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          Admin Dashboard
        </Header>
        <Content
          style={{
            margin: "20px",
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
