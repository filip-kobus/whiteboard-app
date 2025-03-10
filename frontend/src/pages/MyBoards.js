import React from 'react';
import '../styles/Home.css';
import BoardElement from '../components/BoardElement';
import MyNavbar from '../components/MyNavbar';
import Container from 'react-bootstrap/Container';

export default function MyBoards() {  
  const boards = [
    { id: 1, name: 'Blank Board', image: 'https://placehold.co/150x100', url: '/whiteboard' },
    { id: 2, name: 'Lekcja 1', image: 'https://placehold.co/150x100', url: '/whiteboard' },
    { id: 3, name: 'Lekcja 2', image: 'https://placehold.co/150x100', url: '/whiteboard' },
    { id: 4, name: 'Lekcja 3', image: 'https://placehold.co/150x100', url: '/whiteboard' },
    { id: 5, name: 'Lekcja 4', image: 'https://placehold.co/150x100', url: '/whiteboard' },
  ];

  return (
    <>
      {/* Navbar at the top */}
      <MyNavbar />

      {/* Board Selection Section */}
      <Container className="board-container mt-4">
        {/* Page Title */}
        <h2 className="board-page-title">Choose board</h2>

        <div className="board-scroll">
          {boards.map(board => (
            <div key={board.id} className="board-wrapper">
              <BoardElement boardName={board.name} imageUrl={board.image} destinationUrl={board.url}/>
              <p className="board-title">{board.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
