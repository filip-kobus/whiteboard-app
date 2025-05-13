import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import "./Boards.css";

function Board({ imageUrl="/images/board.png", destinationUrl, boardId, onDelete, showManageModal }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleManageTokens = () => {
    window.location.href = `/manage/${boardId}`;
  };

  return (
    <>
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
              <Dropdown.Item onClick={handleManageTokens}>
                Manage Tokens
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigator.clipboard.writeText(boardId)}>
                Copy Token to Clipboard
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onDelete(boardId)}>
                Delete Board
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card>
    </>
  );
}

export default Board;