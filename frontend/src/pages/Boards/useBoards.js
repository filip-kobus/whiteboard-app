import { useState, useEffect } from 'react';


const useBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBoards() {
      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setBoards(data);
      } catch (error) {
        console.error("Error fetching boards:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBoards();
  }, []);

  return { boards, loading, error };
};

export default useBoards;
