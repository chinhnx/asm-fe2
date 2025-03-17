import { useRoutes } from "react-router";
import "./App.css";
import ProductList from "./pages/product/list";
import ProductAdd from "./pages/product/add";
import ProductEdit from "./pages/product/edit";

function App() {
  const element = useRoutes([
    {
      path: "/product/list",
      element: <ProductList />,
    },
    {
      path: "/product/add",
      element: <ProductAdd />,
    },
    {
      path: "/product/:id/edit",
      element: <ProductEdit />,
    },
  ]);
  return <div>{element}</div>;
}

export default App;
