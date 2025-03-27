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
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
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
        { path: "user", element: isAuthenticated && role === "admin" ? <UserList /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
        { path: "user-edit/:id", element: isAuthenticated && role === "admin" ? <UserEdit /> : <Navigate to={isAuthenticated && role === "user" ? "/" : "/login"} /> },
      ],
    },
  ]);

  return <div>{element}</div>;
}

export default App;