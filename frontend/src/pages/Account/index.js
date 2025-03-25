import { Container, Button, Card, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Account({ user }) {
  if (!user) {
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
        <Image src={user.avatarUrl} roundedCircle style={{ width: 100, height: 100, marginBottom: 20 }} />
        <h3>Welcome, {user.username}</h3>
        <p><FontAwesomeIcon icon={faUserCircle} /> User ID: {user.userId}</p>
        <p><FontAwesomeIcon icon={faInfoCircle} /> Session Details: {JSON.stringify(user.signInDetails)}</p>
        <Button variant="danger">Logout</Button>
      </Card>
    </Container>
  );
}

export default Account;
