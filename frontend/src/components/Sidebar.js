import React, { useState, useRef } from "react";
import { useNavigate } from "react-router"; // Fixed import
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  return (
    <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      {/* Sidebar Toggle Icon (Always Visible, Rotates Dynamically) */}
      <div
        className={`sidebar_icon ${sidebarOpen ? "rotate_right" : "rotate_left"}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="sidebar_svg_icon"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </div>

      {/* Sidebar Content */}
      {sidebarOpen && (
        <div className="sidebar_items">
          {/* Clickable Home Item */}
          <div className="sidebar_item" onClick={() => { navigate("/"); setSidebarOpen(false); }}>
            <i className="fas fa-home"></i>
            <p>Home</p>
          </div>

          {/* Clickable Option Item */}
          <div className="sidebar_item" onClick={() => { navigate("/my-boards"); setSidebarOpen(false); }}>
            <i className="fas fa-user"></i>
            <p>Boards</p>
          </div>

          {/* Clickable Option Item */}
          <div className="sidebar_item">
            <i className="fas fa-user"></i>
            <p>Account</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
