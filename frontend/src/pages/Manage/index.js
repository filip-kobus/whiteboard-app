import React, { useState, useEffect } from 'react';
import './Manage.css';
import CreateBoard from './CreateBoardForm';
import Container from 'react-bootstrap/Container';
import Board from './Board';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Button from 'react-bootstrap/Button';
import { PlusCircle } from 'react-bootstrap-icons';
import { useAppContext } from '../../libs/contextLib';
import Loading from '../../components/Loading';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function ManagePanel() {
  const { userId, username } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [boards, setBoards] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const fetchBoards = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getuser?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch boards');

      const data = await response.json();
      setBoards(Array.isArray(data.boards) ? data.boards : []);
    } catch (error) {
      console.error('Error fetching boards:', error);
      setBoards([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId, setIsLoading]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleAddBoard = async (newBoard) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, boardName: newBoard.name }),
      });
  
      if (!response.ok) throw new Error('Failed to create board');
      const createdBoard = await response.json();
      setBoards((prevBoards) => [...prevBoards, createdBoard]);

      console.log(username);
      await fetch(`${process.env.REACT_APP_API_URL}/addtoken`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ boardId: createdBoard.board.boardId, username: username }),
      });

      await fetchBoards();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating board:', error);
      alert('Failed to create board. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      setIsLoading(true);
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

      setBoards((prevBoards) => prevBoards.filter((board) => board.boardId !== boardId));
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('Failed to delete the board. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToManageTokens = (boardId) => {
    navigate(`/manage/${boardId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="admin-container mt-4">
      <h2 className="title mb-5">Manage Boards</h2>

      <div key={boards.length} className="board-scroll">
        {boards.map((board, index) => (
          <div
            key={`${board.boardId}-${index}`}
            className="board-wrapper"
          >
            <Board
              destinationUrl={`/board/${board.boardId + userId}&teacher=true`}
              boardId={board.boardId}
              userId={userId}
              onDelete={handleDeleteBoard}
              onManage={() => handleNavigateToManageTokens(board.boardId)}
            />
            <p className="board-title">{board.boardName}</p>
          </div>
        ))}

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
