import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Whiteboard from './pages/Whiteboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBoards from './pages/MyBoards';
import { BrowserRouter, Routes, Route } from "react-router";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/whiteboard" element={<Whiteboard />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-boards" element={<MyBoards />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
