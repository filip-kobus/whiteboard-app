import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import "./Boards.css";


function Board({ imageUrl="/images/board.png", destinationUrl, boardId }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCopyToken = () => {
    // Replace with your actual token logic
    const token = boardId;
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard!');
  };

  const handleDeleteBoard = () => {
    // Replace with your actual token logic
    const token = "board-token-123";
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard!');
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