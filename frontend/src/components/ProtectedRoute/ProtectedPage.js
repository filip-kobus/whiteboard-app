import React from 'react';
import RedirectToLoginButton from './RedirectToLoginButton';

function ProtectedPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Access Denied</h1>
            <p>You must be logged in to view this content.</p>
        <RedirectToLoginButton />
  </div>
  );
}

export default ProtectedPage;
