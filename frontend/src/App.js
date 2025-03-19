import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './components/MainNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBoards from './pages/MyBoards';
import ConfirmRegistration from './pages/ConfirmRegistration';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import Account from './pages/Account';
import './styles/Global.css';

function App() {
  return (
    <div className="global-background">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route element={<ProtectedRoute />}>
              <Route path="/my-boards" element={<MyBoards />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
            </Route>
            <Route path="/confirm-registration" element={<ConfirmRegistration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
