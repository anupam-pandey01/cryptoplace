import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './component/Navbar/Navbar'
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
      </Routes>
    </div>
  )
}

export default App
