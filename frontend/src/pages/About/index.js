import React from 'react';
import { Container } from 'react-bootstrap';

function About() {
  return (
    <div className="mt-5">
      <Container className="padding-10 text-center">
        <h2 className="text-center mb-4 title">About Us</h2>
        <p className="text-center mb-4 subtitle">
          Welcome to our application! Here's a little about who we are and what we do.
        </p>
        <p className="text-center">
          Our mission is to provide innovative tools that empower creativity and collaboration.
          We are a passionate team dedicated to delivering the best user experience possible.
        </p>
        <p className="text-center">
          Thank you for choosing our platform. We hope it helps you achieve your goals!
        </p>
      </Container>
    </div>
  );
}

export default About;
