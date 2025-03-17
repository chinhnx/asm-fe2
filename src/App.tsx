
// import './App.css'
import {  useNavigate, useRoutes } from 'react-router-dom'
import HomePage from './pages/client/HomePage'
import ProductList from './pages/admin/product/ProductList';
import ProductAdd from './pages/admin/product/ProductAdd';
import ProductEdit from './pages/admin/product/ProductEdit';
import CategoryList from './pages/admin/category/CategoryList';
import CategoryAdd from './pages/admin/category/CategoryAdd';
import CategoryEdit from './pages/admin/category/CategoryEdit';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import "antd/dist/reset.css";
import Register from './pages/admin/auth/Register';
import Login from './pages/admin/auth/Login';
import Dashboard from './pages/admin/Dashboard/Dashboard';


function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  const nav = useNavigate()

  const routes = [
    {
      path: '/homepage',
      element: <HomePage />
    },
    {
      path: '/admin',
      element: <Dashboard />
    },
    {
      path: '/admin/product',
      element: <ProductList />
    },
    {
      path: '/admin/product-add',
      element: <ProductAdd />
    },
    {
      path: '/admin/product-edit/:id',
      element: <ProductEdit />
    },
    {
      path: '/admin/category',
      element: <CategoryList />
    },
    {
      path: '/admin/category-add',
      element: <CategoryAdd />
    },
    {
      path: '/admin/register',
      element: <Register />
    },
    {
      path: '/admin/login',
      element: <Login />
    },
    
    
    
  ]

  const element = useRoutes(routes)
  const sidebarItems = [
    {key: "/admin", label:"Dashboard"},
    {key: "/admin/product", label:"Products"},
    {key: "/admin/category", label:"Categories"},
    {key: "/admin/register", label:"Register"},
    {key: "/admin/login", label:"Login"},
  ]
  
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
          {element}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
