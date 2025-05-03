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
import { getCurrentUser } from 'aws-amplify/auth'
import * as Auth from 'aws-amplify/auth'
import Loading from "./components/Loading";
import Confirm from "./components/ConfirmEmail";
import './index.css';


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isVerified, setVerified] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  async function getUser() {
    try {
      console.log(Auth)
      const user = await getCurrentUser();
      const userId = user['userId'];
      userHasAuthenticated(true);
      setUserId(userId);
    } catch (err) {
      userHasAuthenticated(false);
      setVerified(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isVerified) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      getUser();
    }
  }, [isVerified]);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, userId, setUserId, isLoading, setIsLoading, isVerified, setVerified }}>
      <div className="global-background">
        <Router>
          <Navbar />
          {isLoading ? (
            <Loading />
          ) : (
            !isVerified && (
              <Confirm userId={userId} onVerified={() => {
                setVerified(true);
                setIsLoading(false);
              }} />
            )
          )}
          {!isLoading && isVerified && (
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
