import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Alert.css";

function Alert({ alert }) {
  if (!alert) return null; // Do not render if there's no alert

  return ReactDOM.createPortal(
    <div className={`alert alert-${alert.type}`}>
      {alert.message}
    </div>,
    document.getElementById("alert-root") // Render into a separate DOM node
  );
}

Alert.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["info", "success", "warning", "danger"]).isRequired,
  }),
};

export default Alert;