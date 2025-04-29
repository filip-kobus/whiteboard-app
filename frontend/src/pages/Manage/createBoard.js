import EmailInviteForm from './emailInvite';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';


export default function CreateBoard({ onCreate }) {
  const [newBoardName, setNewBoardName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleAddBoard = () => {
    if (!newBoardName) {
      alert('Please enter a board name.');
      return;
    }

    const newBoard = {
      name: newBoardName,
      email: userEmail || '',
    };

    onCreate(newBoard);

    setNewBoardName('');
    setUserEmail('');
  };

    return (
      <div className="d-flex justify-content-center mx-auto">   
        <div className="popup-window">
          <Form className="form">
            <Form.Group className="mb-3">
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter board name"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <EmailInviteForm />
            </Form.Group>
  
            <Button className="submit-button" onClick={handleAddBoard}>Create Board</Button>
          </Form>
        </div>
      </div>
    );
  }