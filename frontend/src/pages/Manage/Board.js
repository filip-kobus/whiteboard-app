import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import "./Boards.css";


function Board({ imageUrl="/images/board.png", destinationUrl, boardId, userId }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCopyToken = () => {
    // Replace with your actual token logic
    const token = boardId;
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard!');
  };

  const handleDeleteBoard = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/removeboard`,
        {
          method: 'DELETE',
          headers: {
        'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            boardId: boardId,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to delete the board');
      }
  
      alert('Board deleted successfully!');
      // Optionally, trigger a parent function to refresh the board list
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('Failed to delete the board. Please try again.');
    }
  };

  const handleRegenerateToken = () => {
    // Replace with your actual token logic
    const token = "board-token-123";
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard!');
  };

  return (
    <Card className="board-card">
      <div className="position-relative">
        <a href={destinationUrl} className="board-link">
          <Card.Img variant="top" src={imageUrl} />
        </a>
        
        
        {/* Settings Dropdown */}
        <Dropdown 
          align="end" 
          className="position-absolute top-0 end-0 m-2"
          onToggle={(isOpen) => setShowDropdown(isOpen)}
        >
        <Dropdown.Toggle 
          variant="link" 
          bsPrefix="p-0 bg-transparent border-0 shadow-none"
          className="text-dark"
        >
          <ThreeDotsVertical size={20} />
        </Dropdown.Toggle>

          <Dropdown.Menu show={showDropdown}>
            <Dropdown.Item onClick={handleRegenerateToken}>
              Regenerate Token
            </Dropdown.Item>
            <Dropdown.Item onClick={handleCopyToken}>
              Copy Token to Clipboard
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteBoard}>
              Delete Board
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Card>
  );
}

export default Board;