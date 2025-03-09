import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      {/* Sidebar Toggle Icon */}
      {!sidebarOpen && (
        <div className="sidebar_icon" onClick={() => setSidebarOpen(true)}>
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
      )}

      {/* Sidebar Content */}
      {sidebarOpen && (
        <div className="sidebar_items">
          {/* Clickable Home Item */}
          <div className="sidebar_item" onClick={() => { navigate("/"); setSidebarOpen(false); }}>
            <i className="fas fa-home"></i>
            <p>Home</p>
          </div>

          {/* Clickable Users Item */}
          <div className="sidebar_item">
            <i className="fas fa-user"></i>
            <p>Users</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
