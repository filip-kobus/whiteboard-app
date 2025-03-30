import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Contact() {
  return (
    <div className="content-section">
      <Container className="content-container padding-10">
        <h2 className="text-center mb-4 title">Contact Us</h2>
        <p className="text-center mb-4 subtitle">
          Have a question or need support? Send us a message!
        </p>

        <Form className="form">
          {/* Name Input */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
          </Form.Group>

          {/* Email Input */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" required />
          </Form.Group>

          {/* Message Input */}
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Enter your message" required />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="w-100 submit-button">
            Send Message
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Contact;
