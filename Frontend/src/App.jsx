import React from 'react'
import Verify from './pages/Verify'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
     <Link to="/login">Login Page</Link>
      <br />
      <Link to="/verify">Verify Page</Link>
    <Routes>
      <Route path="/verify" element={<Verify/>} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
