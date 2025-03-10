import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';

function Register() {
  return (
    <>
      {/* Navbar at the top */}
      <MyNavbar />

      {/* Centered Register Form with More Spacing */}
      <Container 
        className="d-flex justify-content-center align-items-center" 
        style={{ 
          minHeight: "75vh", // Keeps it balanced
        }}
      >
        <div 
          className="p-5 border rounded shadow bg-white" 
          style={{ width: '450px' }} // Increased width for better spacing
        >
          <h2 className="text-center mb-4 text-dark">Register</h2>
          <Form>
            {/* Username Input */}
            <Form.Group className="mb-4" controlId="formBasicUsername">
              <Form.Label className="text-dark fw-semibold">Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" required />
            </Form.Group>

            {/* Email Input */}
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="text-dark fw-semibold">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="text-dark fw-semibold">Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" required />
            </Form.Group>

            {/* Confirm Password Input */}
            <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
              <Form.Label className="text-dark fw-semibold">Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" required />
            </Form.Group>

            {/* Terms & Conditions Checkbox */}
            <Form.Group className="mb-4">
              <Form.Check 
                type="checkbox" 
                label="I agree to the Terms and Conditions" 
                className="text-dark"
                required 
              />
            </Form.Group>

            {/* Register Button */}
            <Button variant="dark" type="submit" className="w-100 py-2 fw-semibold">
              Register
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Register;
