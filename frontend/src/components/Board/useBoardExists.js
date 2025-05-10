import { useState, useEffect } from 'react';

function useBoardExists(boardId) {
    const [exists, setExists] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!boardId) return;

        const checkBoardExists = async () => {
            try {
                setLoading(true);
                const apiUrl = `${process.env.REACT_APP_API_URL}/exists?boardId=${boardId}`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error('Failed to fetch board existence status');
                }

                const data = await response.json();
                setExists(data.exists); // Assuming the API returns { exists: true/false }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        checkBoardExists();
    }, [boardId]);

    return { exists, loading, error };
}

export default useBoardExists;
