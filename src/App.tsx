import { useNavigate, useRoutes } from 'react-router-dom';



import Client from './Layout/ClientLayout';
import HomePage from './pages/client/HomePage';
import Product from './pages/client/Products';
import ProductDetail from './pages/client/ProductDetail';
import Cart from './pages/client/Cart';
import Admin from './Layout/AdminLayout';
import ProductList from './pages/admin/product/ProductList';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import CategoryList from './pages/admin/category/CategoryList';
import ProductAdd from './pages/admin/product/ProductAdd';
import ProductEdit from './pages/admin/product/ProductEdit';
import CategoryAdd from './pages/admin/category/CategoryAdd';
import CategoryEdit from './pages/admin/category/CategoryEdit';
import Register from './pages/admin/auth/Register';
import { LogIn } from 'lucide-react';





function App() {
const element = useRoutes([
  {path:"",element:<Client/>,children:[
    {
      path:"",element:<HomePage/>
    },
    {
      path:"products",element:<Product/>
    },
    {path:"product/:id", element:<ProductDetail/>},
    {path:"cart", element:<Cart/>}

  ]},
  {
    path:"admin",element:<Admin/>,children:[
      {path:"dashboard",element:<Dashboard/>},
      {path:"product",element:<ProductList/>},
      {path:"product-add",element:<ProductAdd/>},
      {path:"product-edit/:id",element:<ProductEdit/>},
      {path:"category",element:<CategoryList/>},
      {path:"category-add",element:<CategoryAdd/>},
      {path:"product-edit/:id",element:<CategoryEdit/>},
      {path:"register",element:<Register/>},
      {path:"login",element:<LogIn/>}
    ]
  }
])

  return (
    <div>
      {element}
    </div>
  );
}

export default App;
