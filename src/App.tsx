// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/client/HomePage'
import ProductList from './pages/admin/product/ProductList';
import ProductAdd from './pages/admin/product/ProductAdd';
import ProductEdit from './pages/admin/product/ProductEdit';
import CategoryList from './pages/admin/category/CategoryList';
import CategoryAdd from './pages/admin/category/CategoryAdd';
import CategoryEdit from './pages/admin/category/CategoryEdit';


function App() {
  return(       
  <>
 <Routes>
  <Route path='/homepage' element={< HomePage/>} />
  <Route path='/admin/product' element={< ProductList/>} />
  <Route path='/admin/product-add' element={< ProductAdd/>} />
  <Route path='/admin/product-edit/:id' element={< ProductEdit/>} />
  <Route path='/admin/category' element={< CategoryList/>} />
  <Route path='/admin/category-add' element={< CategoryAdd/>} />
  <Route path='/admin/category-edit/:id' element={< CategoryEdit/>} />
  

 </Routes></>)
}

export default App ;
