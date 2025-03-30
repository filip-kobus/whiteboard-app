import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

function RedirectToLoginButton() {
  const navigate = useNavigate();

  return (
    <Button className='submit-button' onClick={() => navigate('/login')}>
      Go to Login
    </Button>
  );
}

export default RedirectToLoginButton;
