import React, { useState, useEffect } from "react";
import { AppContext } from "./libs/contextLib";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Boards from './pages/Boards';
import Manage from './pages/Manage';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Code from './pages/Code';
import NotFound from './pages/NotFound';
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentUser } from 'aws-amplify/auth'
import './index.css';


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  async function getUser() {
    try {
      await getCurrentUser()
      userHasAuthenticated(true)
    }
    catch (err) {
      userHasAuthenticated(false)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <div className="global-background">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={!isAuthenticated ? <Home /> : <Manage />} />
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Manage />
                </ProtectedRoute>
                } />
              <Route path="/contact" element={<Contact />} />
              <Route path="/code" element={<Code />} />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
                } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
    </AppContext.Provider>

      )
    };

export default App;
