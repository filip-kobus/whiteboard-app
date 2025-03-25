import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Boards from './pages/Boards';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Account from './pages/Account';
import './index.css';

function App() {
  return (
    <div className="global-background">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/my-boards" element={<Boards />} />
            <Route path="/admin-panel" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
