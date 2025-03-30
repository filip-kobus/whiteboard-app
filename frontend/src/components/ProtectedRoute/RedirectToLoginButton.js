import React from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectToLoginButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/login')} style={{ marginTop: '20px', fontSize: '16px', padding: '10px 20px' }}>
      Go to Login
    </button>
  );
}

export default RedirectToLoginButton;
