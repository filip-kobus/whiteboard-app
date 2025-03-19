import React, { useState, useEffect } from "react";
import "../styles/Boards.css";
import BoardElement from "../components/BoardElement";
import Container from "react-bootstrap/Container";
import { useAuth } from "../utils/AuthContext";

export default function MyBoards() {
  const [boards, setBoards] = useState([]);  // State for storing fetched boards
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const { user } = useAuth()


  useEffect(() => {
    console.log(user)
    async function fetchBoards() {
      const apiUrl = "https://ianedfrbv2.execute-api.eu-central-1.amazonaws.com/default/HelloWorld";  // Replace with your API Gateway URL

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBoards(data); // Update state with API data
      } catch (error) {
        console.error("Error fetching boards:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    }

    fetchBoards();
  }, []); // Runs only once when component mounts

  return (
    <>
      <Container className="board-container mt-4">
        <h2 className="title mb-5">Choose board</h2>

        {/* Loading Indicator */}
        {loading && <p>Loading boards...</p>}

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {/* Board List */}
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
