import DescriptionForm from './DescriptionForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

export default function CreateBoard({ onCreate }) {
  const [newBoardName, setNewBoardName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddBoard = (e) => {
    e.preventDefault(); // Prevent form submission

    if (!newBoardName) {
      alert('Please enter a board name.');
      return;
    }

    const newBoard = {
      name: newBoardName,
      description: description || '',
    };

    onCreate(newBoard);

    setNewBoardName('');
    setDescription('');
  };

  return (
    <div className="d-flex justify-content-center mx-auto">
      <div className="popup-window">
        <Form onSubmit={handleAddBoard} className="form">
          <Form.Group className="mb-3">
            <Form.Label>Board Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter board name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
          </Form.Group>
          <DescriptionForm desription={description} setDescription={setDescription} />
          <Button className="submit-button" type="submit">
            Create Board
          </Button>
        </Form>
      </div>
    </div>
  );
}