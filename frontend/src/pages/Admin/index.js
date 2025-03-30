import React, { useState } from 'react';
import './Admin.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BoardElement from '../Boards/Board';
import { withAuthenticator } from '@aws-amplify/ui-react';


function AdminPanel() {  
  const [boards, setBoards] = useState([
    { id: 1, name: 'Blank Board', image: 'https://placehold.co/150x100', url: '/whiteboard' },
    { id: 2, name: 'Project Planning', image: 'https://placehold.co/150x100', url: '/whiteboard' },
  ]);

  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardImage, setNewBoardImage] = useState('');
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  /** Function to add a new board */
  const handleAddBoard = () => {
    if (!newBoardName) return;
    const newBoard = {
      id: boards.length + 1,
      name: newBoardName,
      image: newBoardImage || 'https://placehold.co/150x100',
      url: '/whiteboard',
    };
    setBoards([...boards, newBoard]);
    setNewBoardName('');
    setNewBoardImage('');
  };

  /** Function to assign a user to a board */
  const handleAssignUser = () => {
    if (!selectedBoard || !userEmail) return;
    alert(`User ${userEmail} assigned to board ${selectedBoard}`);
    setUserEmail('');
  };

  return (
    <Container className="admin-container mt-4">
      <h2 className="title mb-5">Admin Panel</h2>

      {/* Board Creation Form */}
      <div className="d-flex justify-content-center mx-auto gap-5">   
        <div className="content-container">
          <h4 className='mb-3'>Create a New Board</h4>
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
              <Form.Label>Board Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newBoardImage}
                onChange={(e) => setNewBoardImage(e.target.value)}
              />
            </Form.Group>

            <Button className="submit-button" onClick={handleAddBoard}>Create Board</Button>
          </Form>
        </div>

      {/* Assign Users to Boards */}
        <div className="content-container">
          <h4 className='mb-3'>Assign Users to a Board</h4>
          <Form className="form">
            <Form.Group className="mb-3 select" >
              <Form.Label>Select Board</Form.Label>
              <select className='form-control' onChange={(e) => setSelectedBoard(e.target.value)}>
                {boards.map((board) => (
                  <option key={board.id} value={board.name}>{board.name}</option>
                ))}
              </select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter user email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Form.Group>

            <Button className='submit-button' onClick={handleAssignUser}>Assign User</Button>
          </Form>
        </div>
      </div>

      {/* Display Boards */}
      <h4 className="mt-5">Existing Boards</h4>
      <div className="board-scroll">
        {boards.map(board => (
          <div key={board.id} className="board-wrapper">
            <BoardElement boardName={board.name} imageUrl={board.image} destinationUrl={board.url} />
            <p className="board-title">{board.name}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default withAuthenticator(AdminPanel)