import React from 'react';
import Card from 'react-bootstrap/Card';

function BoardElement({ boardName, imageUrl, destinationUrl }) {
  return (
    <a href={destinationUrl} className="board-link">
      <Card className="board-card">
        <Card.Img variant="top" src={imageUrl} alt={boardName} />
      </Card>
    </a>
  );
}

export default BoardElement;
