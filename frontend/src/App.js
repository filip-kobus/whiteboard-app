import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBoards from './pages/MyBoards';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import './styles/Global.css'; // Globalne style dla wszystkich stron

function App() {
  return (
    <div className="global-background">
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-boards" element={<MyBoards />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
