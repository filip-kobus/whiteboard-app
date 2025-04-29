import React, { use } from 'react';
import './Home.css';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
  const navigate = useNavigate()
  
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <h1 className="title">Welcome to the Open Source Whiteboard App</h1>
          <p className="subtitle">
            A free-to-use platform for seamless online collaboration.
          </p>
          
          {/* Form for email signup */}
          <Form className="hero-form">
            <Button variant="primary" className="hero-button" onClick={() => navigate('/login')} >Sign up as teacher</Button>
            <Button variant="primary" className="hero-button" onClick={() => navigate('/join')} >You have a code</Button>
          </Form>
        </Container>
      </div>
    </>
  );
}
