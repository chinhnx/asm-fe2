// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/client/HomePage'


function App() {
  return(       
  <>
 <Routes>
  <Route path='/homepage' element={< HomePage/>} />

 </Routes></>)
}

export default App ;
