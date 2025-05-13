import { Form } from 'react-bootstrap';

function DescriptionForm({ description, setDescription }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Board Description (Optional)</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Form.Group>
  );
}

export default DescriptionForm;