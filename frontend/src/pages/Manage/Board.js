import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import "./Boards.css";


function Board({ imageUrl="/images/board.png", destinationUrl, boardId, onDelete }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCopyToken = () => {
    const token = boardId;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(token)
        .then(() => {
          showAlert('Token copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy token:', err);
          fallbackCopyTextToClipboard(token);
        });
    } else {
      console.warn('Clipboard API not supported, using fallback.');
      fallbackCopyTextToClipboard(token);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Avoid scrolling to the bottom
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showAlert('Token copied to clipboard!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  };
  
  const showAlert = (message) => {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.bottom = '20px';
    alertBox.style.right = '20px';
    alertBox.style.backgroundColor = '#28a745';
    alertBox.style.color = '#fff';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    alertBox.style.zIndex = '1000';
    document.body.appendChild(alertBox);
    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, 3000);
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
            <Dropdown.Item onClick={() => onDelete(boardId)}>
              Delete Board
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Card>
  );
}

export default Board;