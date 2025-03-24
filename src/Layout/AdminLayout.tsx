import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import Sider from "antd/es/layout/Sider";
import { UserOutlined, HomeOutlined, ShopOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
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
          <Menu.Item  icon={<ShopOutlined />}>
            <Link to="/admin/product">Product List</Link>
          </Menu.Item>
          <Menu.Item icon={<ShopOutlined />}>
            <Link to="/admin/category">Category List</Link>
          </Menu.Item>
          <Menu.Item  icon={<UserOutlined />}>
          <Link to="/admin/user">User</Link>
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
