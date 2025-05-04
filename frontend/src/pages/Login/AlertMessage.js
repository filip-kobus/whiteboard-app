import React from "react";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function AlertMessage({ show, variant, message, onClose }) {
  if (!show) return null;

  return (
    <Alert
      variant={variant}
      className="custom-alert"
      dismissible
      onClose={onClose}
    >
      <div className="d-flex align-items-center">
        <FontAwesomeIcon
          icon={variant === 'success' ? faCheckCircle : faExclamationCircle}
          className="me-2"
        />
        <span>{message}</span>
      </div>
    </Alert>
  );
}

export default AlertMessage;