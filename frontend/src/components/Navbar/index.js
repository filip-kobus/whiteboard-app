import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { default as BootstrapNavbar }  from 'react-bootstrap/Navbar';

function Navbar({ signOut }) {
  const user = true;
  const logout = false;
  return (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary px-4 py-3">
      <Container>
        {/* Brand name */}
        <BootstrapNavbar.Brand href="/" className="me-5 fs-4"> 
          Whiteboard-app
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-BootstrapNavbar-nav" />
        <BootstrapNavbar.Collapse id="basic-BootstrapNavbar-nav">
          
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
                <Nav.Link onClick={ signOut }>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>

        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
