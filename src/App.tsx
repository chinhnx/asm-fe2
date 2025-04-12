import { useNavigate, useRoutes } from "react-router-dom";
import Client from "./Layout/ClientLayout";
import HomePage from "./pages/client/HomePage";
import Product from "./pages/client/Products";
import ProductDetail from "./pages/client/ProductDetail";
import Cart from "./pages/client/Cart";
import Admin from "./Layout/AdminLayout";
import ProductList from "./pages/admin/product/ProductList";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import CategoryList from "./pages/admin/category/CategoryList";
import ProductAdd from "./pages/admin/product/ProductAdd";
import ProductEdit from "./pages/admin/product/ProductEdit";
import CategoryAdd from "./pages/admin/category/CategoryAdd";
import CategoryEdit from "./pages/admin/category/CategoryEdit";
import Register from "./pages/admin/auth/Register";
import Login from "./pages/admin/auth/Login";
import UserList from "./pages/admin/user/UserList";
import UserEdit from "./pages/admin/user/UserEdit";
import { Navigate } from "react-router-dom";
import Profile from "./pages/client/Profile";
import CategoryPage from "./pages/client/CategoryPage";
import Checkout from "./pages/client/Checkout";
import Order from "./pages/client/Order";
import OrderList from "./pages/admin/order/Oders";
import OderDetail from "./pages/admin/order/OderDetail";
import OderDetailClient from "./pages/client/OderDetail";


function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAuthenticated = !!token; // Kiểm tra xem người dùng đã đăng nhập hay chưa

  const element = useRoutes([
    {
      path: "",
      element: <Client />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "products",
          element: <Product />,
        },
        { path: "products/:id", element: <ProductDetail /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        { path: "order", element: <Order /> },
        { path: "order-detail/:id", element: <OderDetailClient/> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path : "profile", element:<Profile/>},
        { path: "category/:categoryType", element: <CategoryPage /> },
        
      ],
    },
    {
      path: "admin",
      element: isAuthenticated && role === "admin" ? <Admin /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} />,
      children: [
        { path: "dashboard", element: isAuthenticated && role === "admin" ? <Dashboard /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "product", element: isAuthenticated && role === "admin" ? <ProductList /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "product-add", element: isAuthenticated && role === "admin" ? <ProductAdd /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "product-edit/:id", element: isAuthenticated && role === "admin" ? <ProductEdit /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "category", element: isAuthenticated && role === "admin" ? <CategoryList /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "category-add", element: isAuthenticated && role === "admin" ? <CategoryAdd /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "category-edit/:id", element: isAuthenticated && role === "admin" ? <CategoryEdit /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "order", element: isAuthenticated && role === "admin" ? <OrderList /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "order-detail/:id", element: isAuthenticated && role === "admin" ? <OderDetail /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "user", element: isAuthenticated && role === "admin" ? <UserList /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "user-edit/:id", element: isAuthenticated && role === "admin" ? <UserEdit /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
      ],
    },
  ]);

  return <div>{element}</div>;
}

export default App;