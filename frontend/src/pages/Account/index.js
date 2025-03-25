import React from "react";
import { Container, Button, Card } from "react-bootstrap";


function Account() {
  const user = "Jan"
  const loading = false

  if (loading) {
    return <Container><p>Loading...</p></Container>;
  }

  if (user === null) {
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
      <Card className="p-4 shadow-lg">

        <Button variant="danger">
          Logout
        </Button>
      </Card>
    </Container>
  );
}

export default Account;
