import React, { useState, useEffect } from "react";
import { AppContext } from "./libs/contextLib";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Manage from './pages/Manage';
import About from './pages/About';
import Account from './pages/Account';
import Tokens from './pages/Tokens';
import Join from './pages/Join';
import Board from './pages/Board';
import NotFound from './pages/NotFound';
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentUser } from 'aws-amplify/auth';
import Loading from "./components/Loading";
import './index.css';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getUser() {
    try {
      const user = await getCurrentUser();
      const userId = user['userId'];
      userHasAuthenticated(true);
      setUserId(userId);
    } catch (err) {
      userHasAuthenticated(false);
      setUserId(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, [userHasAuthenticated]);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, userId, setUserId, isLoading, setIsLoading }}>
      <div className="global-background">
        <Router>
          <Navbar />
          {isLoading && <Loading />} {/* Show loading spinner without blocking the entire app */}
           <Routes>
             <Route path="/" element={!isAuthenticated ? <Home /> : <Manage userId={userId} />} />
             <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
             <Route path="/register" element={<Register />} />
             <Route path="/about" element={<About />} />
             <Route path="/board/:roomId" element={<Board />} />
             <Route path="/board" element={<Join />} />
             <Route path="/account" element={
               <ProtectedRoute>
                 <Account userId={userId} />
               </ProtectedRoute>
             } />
             <Route path="/manage/:boardId" element={
               <ProtectedRoute>
                 <Tokens />
               </ProtectedRoute>
             } />
             <Route path="*" element={<NotFound />} />
           </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
};

export default App;
