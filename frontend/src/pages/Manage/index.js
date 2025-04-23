import React, { useState } from 'react';
import './Manage.css';
import CreateBoard from './createBoard';
import Container from 'react-bootstrap/Container';
import BoardElement from '../Boards/Board';
import { withAuthenticator } from '@aws-amplify/ui-react';


function ManagePanel() {  
  const [boards, setBoards] = useState([
    { id: 1, name: 'Blank Board', image: 'https://placehold.co/150x100', url: '/whiteboard' },
    { id: 2, name: 'Project Planning', image: 'https://placehold.co/150x100', url: '/whiteboard' },
  ]);

  return (
    <Container className="admin-container mt-4">
      <h2 className="title mb-5">Manage Boards</h2>
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

export default withAuthenticator(ManagePanel)