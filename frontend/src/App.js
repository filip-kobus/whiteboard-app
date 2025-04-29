import React, { useState, useEffect } from "react";
import { AppContext } from "./libs/contextLib";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Manage from './pages/Manage';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Join from './pages/Join';
import NotFound from './pages/NotFound';
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'
import Loading from "./components/Loading";
import './index.css';


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state


  async function getUser() {
    try {
      const user = await getCurrentUser();
      const session = await fetchAuthSession();
      const userId = user['userId'];
      const isEmailVerified = session.tokens.idToken.payload.email_verified;

      userHasAuthenticated(true);
      setUserId(userId);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('userId', userId);

      if (isEmailVerified) {
        localStorage.setItem('isEmailVerified', true);
      } else {
        localStorage.setItem('isEmailVerified', false);
        alert("Please verify your email to access the application.");
      }
    } catch (err) {
      console.error("Error checking user authentication:", err);
      userHasAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userId');
      localStorage.removeItem('isEmailVerified');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, [isAuthenticated]);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, userId, isLoading, setIsLoading }}>
      <div className="global-background">
        <Router>
          <Navbar />
          {isLoading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path="/" element={!isAuthenticated ? <Home /> : <Manage userId={userId} />} />
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/join" element={<Join />} />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account userId={userId} />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Router>
      </div>
    </AppContext.Provider>
  );
};

export default App;
