import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from "../utils/AuthContext";


function MainNavbar() {
  const { user, logout } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-4 py-3">
      <Container>
        {/* Brand name */}
        <Navbar.Brand href="/" className="me-5 fs-4"> 
          Whiteboard-app
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Left-aligned navigation links */}
          <Nav className="me-auto gap-4"> 
            <Nav.Link href="/my-boards">My Boards</Nav.Link>
            <Nav.Link href="/admin-panel">Admin Panel</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>

          {/* Right-aligned Login/Register OR Logout */}
          <Nav className="ms-auto gap-3"> 
            {user ? (
              <>
                <Nav.Link href="/account">Account</Nav.Link>
                <Nav.Link onClick={ logout }>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
