import React from 'react';
import '../styles/Home.css';
import { Container, Button, Form } from 'react-bootstrap';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container className="text-center">
          <h1 className="title">Welcome to the Open Source Whiteboard App</h1>
          <p className="subtitle">
            A free-to-use platform for seamless online collaboration.
          </p>
          
          {/* Form for email signup */}
          <Form className="hero-form">
            <Form.Control type="email" placeholder="Enter your email address" className="input-field"/>
            <Button variant="primary" className="hero-button">Sign up for free</Button>
          </Form>
        </Container>
      </div>
    </>
  );
}
