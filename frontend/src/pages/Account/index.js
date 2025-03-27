import { Container, Button, Card, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "../../libs/contextLib";
import { signOut } from 'aws-amplify/auth';

function Account() {
  const { isAuthenticated, userHasAuthenticated } = useAppContext()
  
  async function logout() {
    await signOut()
    userHasAuthenticated(false)
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
    <Container className="mt-5">
      <Card className="p-4 shadow-lg text-center">
        <h3>Welcome, User</h3>
        <p><FontAwesomeIcon icon={faUserCircle} /> User ID: 11</p>
        <p><FontAwesomeIcon icon={faInfoCircle} /> Session Details: 11</p>
        <Button onClick={logout} variant="danger">Logout</Button>
      </Card>
    </Container>
  );
}

export default Account;
