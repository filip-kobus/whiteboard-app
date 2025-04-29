import React, { useState } from 'react';
import './Manage.css';
import CreateBoard from './createBoard';
import Container from 'react-bootstrap/Container';
import BoardElement from '../Boards/Board';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Button from 'react-bootstrap/Button';
import { PlusCircle } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';

function ManagePanel() {  
  const [boards, setBoards] = useState([
    { id: 1, name: 'Blank Board', image: 'https://placehold.co/150x100', url: '/whiteboard' },
    { id: 2, name: 'Project Planning', image: 'https://placehold.co/150x100', url: '/whiteboard' },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleAddBoard = (newBoard) => {
    setBoards([...boards, { 
      id: boards.length + 1, 
      ...newBoard,
      url: '/whiteboard' 
    }]);
    setShowCreateModal(false);
  };

  return (
    <Container className="admin-container mt-4">
      <h2 className="title mb-5">Manage Boards</h2>
      
      <div className="board-scroll">
        {/* Existing boards */}
        {boards.map(board => (
          <div key={board.id} className="board-wrapper">
            <BoardElement boardName={board.name} imageUrl={board.image} destinationUrl={board.url} />
            <p className="board-title">{board.name}</p>
          </div>
        ))}
        
        {/* Plus button for adding new board */}
        <div className="board-wrapper">
          <Button 
            variant="outline-secondary" 
            className="add-board-button"
            onClick={() => setShowCreateModal(true)}
          >
            <PlusCircle size={48} />
          </Button>
        </div>
      </div>

      {/* Create Board Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBoard onCreate={handleAddBoard} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default withAuthenticator(ManagePanel);