import React, { useState, useEffect } from 'react';
import './Manage.css';
import CreateBoard from './createBoard';
import Container from 'react-bootstrap/Container';
import Board from './Board';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Button from 'react-bootstrap/Button';
import { PlusCircle } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';

function ManagePanel({ userId}) {  
  const [boards, setBoards] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getuser/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch boards');
        }
        const data = await response.json();
  
        // Extract the boards array from the response
        if (data && Array.isArray(data.boards)) {
          setBoards(data.boards);
        } else {
          console.error('Unexpected API response format:', data);
          setBoards([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
        setBoards([]); // Fallback to an empty array
      }
    };
  
    fetchBoards();
  }, [userId]);

  const handleAddBoard = async (newBoard) => {
    try {
      // Send the new board data to the backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, boardName: newBoard.name }), // Include userId and boardName in the request
      });
  
      if (!response.ok) {
        throw new Error('Failed to create board');
      }
  
      const createdBoard = await response.json();
  
      // Update the boards state with the newly created board
      setBoards([...boards, createdBoard]);
  
      // Close the modal
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating board:', error);
      alert('Failed to create board. Please try again.');
    }
  };

  return (
    <Container className="admin-container mt-4">
      <h2 className="title mb-5">Manage Boards</h2>
      
      <div className="board-scroll">
        {/* Existing boards */}
        {boards.map(board => (
          <div key={board.boardId} className="board-wrapper">
            <Board destinationUrl={board.url} boardId={board.boardId} userId={userId} />
            <p className="board-title">{board.boardName}</p>
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
          <p className="board-title">Add New Board</p>
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