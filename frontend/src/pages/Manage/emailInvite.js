import React from 'react';
import { Form } from 'react-bootstrap';

function EmailInviteForm({ emails, setEmails }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Invite by Email (Optional)</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Enter email addresses (comma separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />
    </Form.Group>
  );
}

export default EmailInviteForm;