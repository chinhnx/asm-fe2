import { useNavigate, useRoutes } from 'react-router-dom';
import HomePage from './pages/client/HomePage';
import ProductList from './pages/admin/product/ProductList';
import ProductAdd from './pages/admin/product/ProductAdd';
import ProductEdit from './pages/admin/product/ProductEdit';
import CategoryList from './pages/admin/category/CategoryList';
import CategoryAdd from './pages/admin/category/CategoryAdd';
import Register from './pages/admin/auth/Register';
import Login from './pages/admin/auth/Login';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import "antd/dist/reset.css";
import { ReactNode } from 'react'; // Import kiểu ReactNode
import Product from './pages/client/Products';
import Cart from './pages/client/Cart';
import ProductDetail from './pages/client/ProductDetail';

axios.defaults.baseURL = "http://localhost:3000";

// ✅ Thêm kiểu ReactNode cho prop page
function AdminLayout({ page }: { page: ReactNode }) {
  const nav = useNavigate();
  
  const sidebarItems = [
    { key: "/admin", label: "Dashboard" },
    { key: "/admin/product", label: "Products" },
    { key: "/admin/category", label: "Categories" },
    { key: "/admin/register", label: "Register" },
    { key: "/admin/login", label: "Login" },
  ];

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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/admin"]}
          onClick={({ key }) => nav(key)}
          items={sidebarItems}
        />
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
          {page}
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  const routes = [
    //client
    { path: '/homepage/*', element: <HomePage /> },
    { path: '/products', element: <Product /> },
    { path: '/products/:id', element: <ProductDetail /> },
    { path: '/cart', element: <Cart /> },

    //admin
    { path: '/admin', element: <AdminLayout page={<Dashboard />} /> },
    { path: '/admin/product', element: <AdminLayout page={<ProductList />} /> },
    { path: '/admin/product-add', element: <AdminLayout page={<ProductAdd />} /> },
    { path: '/admin/product-edit/:id', element: <AdminLayout page={<ProductEdit />} /> },
    { path: '/admin/category', element: <AdminLayout page={<CategoryList />} /> },
    { path: '/admin/category-add', element: <AdminLayout page={<CategoryAdd />} /> },
    { path: '/admin/register', element: <AdminLayout page={<Register />} /> },
    { path: '/admin/login', element: <AdminLayout page={<Login />} /> },
  ];

  return useRoutes(routes);
}

export default App;
