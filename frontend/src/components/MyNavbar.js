import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-4 py-3">
      <Container>
        {/* Increased spacing between brand and navigation */}
        <Navbar.Brand href="/" className="me-5 fs-4"> 
          Whiteboard-app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left-aligned navigation links */}
          <Nav className="me-auto gap-4"> {/* Increased spacing between links */}
            <Nav.Link href="/my-boards">My Boards</Nav.Link>
            <Nav.Link href="#link">Admin Panel</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>

          {/* Right-aligned Login and Register links */}
          <Nav className="ms-auto gap-3"> {/* Increased spacing between login/register */}
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;