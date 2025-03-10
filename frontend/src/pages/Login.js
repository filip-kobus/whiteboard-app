import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';

function Login() {
  return (
    <>
      {/* Navbar at the top */}
      <MyNavbar />

      {/* Centered Login Form with Slight Lift */}
      <Container 
        className="d-flex justify-content-center align-items-center" 
        style={{ 
          minHeight: "70vh", // Moves it closer to the center
        }}
      >
        <div 
          className="p-5 border rounded shadow bg-white" 
          style={{ width: '400px' }} // Slightly wider form
        >
          <h3 className="text-center mb-4 text-dark">Login</h3>
          <Form>
            {/* Email Input */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-dark">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-dark">Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" required />
            </Form.Group>

            {/* Remember Me Checkbox & Forgot Password Link */}
            <Form.Group className="mb-4 d-flex justify-content-between align-items-center">
              <Form.Check type="checkbox" label="Remember Me" className="text-dark" />
              <a href="/forgot-password" className="text-primary text-decoration-none">
                Forgot Password?
              </a>
            </Form.Group>

            {/* Login Button */}
            <Button variant="dark" type="submit" className="w-100 py-2">
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Login;
