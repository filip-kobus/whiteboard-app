import "./Boards.css";
import BoardElement from "./Board";
import Container from "react-bootstrap/Container";
import useBoards from "./useBoards";

export default function MyBoards() {
  const { boards, loading, error } = useBoards()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading boards: {error}</p>;

  return (
    <>
      <Container className="board-container mt-4">
        <h2 className="title mb-5">Choose board</h2>

        {loading && <p>Loading boards...</p>}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        <div className="board-scroll">
          {boards.map((board) => (
            <div key={board.id} className="board-wrapper">
              <BoardElement boardName={board.name} imageUrl={board.image} destinationUrl={board.url} />
              <p className="board-title">{board.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
