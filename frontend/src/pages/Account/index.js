import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faInfoCircle, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "../../libs/contextLib";
import { signOut, fetchUserAttributes } from 'aws-amplify/auth';

function Account() {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const [userAttributes, setUserAttributes] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  async function fetchUserData() {
    try {
      const attributes = await fetchUserAttributes();
      setUserAttributes(attributes);
    } catch (err) {
      alert('Failed to fetch user data');
      console.error('Error fetching attributes:', err);
    }
  }

  async function logout() {
    try {
      await signOut();
      userHasAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  if (!isAuthenticated) {
    return (
      <Container className="text-center mt-5">
        <Card className="p-4 shadow-lg">
          <h2>You are not logged in</h2>
          <p>Please log in to view your account details.</p>
          <Button as="a" href="/login" variant="primary">
            Login
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <div className="content-section">
      <Card className="content-container">
        <h3 className="title">Welcome, {userAttributes?.name || 'User'}</h3>
        
        {userAttributes?.email && (
          <p className="mt-4">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            Email: {userAttributes.email}
          </p>
        )}
        
        {userAttributes?.name && (
          <p>
            <FontAwesomeIcon icon={faUser} className="me-2" />
            Name: {userAttributes.name}
          </p>
        )}
        
        <Button onClick={logout} className="submit-button">
          Logout
        </Button>
      </Card>
    </div>
  );
}

export default Account;