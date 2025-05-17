import { Container } from 'react-bootstrap';

function About() {
  return (
    <div className="mt-5">
      <Container className="py-4 text-center">
        <h2 className="mb-4 title">About Us</h2>
        <p className="mb-4 subtitle">
          Welcome to my application! Here’s a little about the project.
        </p>
        <p className='text-center'>
          This is a simple web app for creating and managing whiteboards. 
          It offers an intuitive interface for adding, viewing, and deleting tokens. 
          Built with React and Bootstrap, it’s deployed using serverless technologies like AWS Lambda and DynamoDB.
        </p>
        <p className='text-center'>
          Thank you for choosing this platform. I hope you enjoy it!
        </p>
      </Container>
    </div>
  );
}

export default About;
