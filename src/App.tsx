// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useRoutes } from 'react-router-dom'
import HomePage from './pages/client/HomePage'
import ProductList from './pages/admin/product/ProductList';
import ProductAdd from './pages/admin/product/ProductAdd';
import ProductEdit from './pages/admin/product/ProductEdit';
import CategoryList from './pages/admin/category/CategoryList';
import CategoryAdd from './pages/admin/category/CategoryAdd';
import CategoryEdit from './pages/admin/category/CategoryEdit';
import Dashboard from './layout/dashboard';


function App() {

  const element = useRoutes([
    {
      path: '/homepage',
      element: <HomePage />
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
      path: '/admin/category-edit/:id',
      element: <CategoryEdit />
    },
    {
      path: "/admin",
      element : <Dashboard/>
    }
    
    
  ])
 
  return <div>{element}</div>;

}

export default App;
