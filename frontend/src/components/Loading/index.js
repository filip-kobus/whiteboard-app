import React from "react";
import "./loading.css"; // Ensure you create a CSS file for styling

export default function Loading({ message = "Loading..." }) {
  return (
    <div className="loading">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <p>{message}</p>
    </div>
  );
}