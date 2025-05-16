import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddTokenForm from './AddTokenForm';
import TokenList from './TokenList';
import './ManageTokenForm.css';
import Loading from '../../components/Loading';

export default function ManageToken() {
    const { boardId } = useParams();
    const [tokens, setTokens] = useState([]);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch tokens for the board
        const fetchTokens = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/gettokens?boardId=${boardId}`);
                if (!response.ok) throw new Error('Failed to fetch tokens');
                const data = await response.json();
                setTokens(data.tokens || []);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTokens();
    }, [boardId]);

    const handleAddToken = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            alert('Please enter a valid username.');
            return;
        }

        setIsLoading(true); // Start loading
        try {
            // Send the new token to the backend
            const response = await fetch(`${process.env.REACT_APP_API_URL}/addtoken`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardId, username: username.trim() }),
            });
            setIsLoading(true);
            const result = await response.json();
            console.log('Response from addtoken:', result);

            if (response.ok) {
                setTokens((prevTokens) => [...prevTokens, result.token]);
                setUsername('');
            } else {
                alert(result.message || 'Failed to add token.');
            }
        } catch (error) {
            console.error('Error adding token:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleCopyLink = (token) => {
        const url = `${process.env.REACT_APP_HOST_URL}/board/${token}`;
        copy(url);
    };

    function copy(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = 0;
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('Link copied to clipboard!');
            } else {
                alert('Failed to copy link.');
            }
        } catch (err) {
            alert('Failed to copy link.');
        }
        document.body.removeChild(textArea);
    }

    const handleDeleteToken = async (tokenToDelete) => {
        setIsLoading(true); // Start loading
        try {
            // Delete the token from the backend
            await fetch(`${process.env.REACT_APP_API_URL}/removetoken`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardId, token: tokenToDelete }),
            });

            setTokens((prevTokens) => prevTokens.filter((token) => token.token !== tokenToDelete));
        } catch (error) {
            console.error('Error deleting token:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // Helper to format timestamps
    function formatTimestamp(ts) {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleString();
    }

    return (
        isLoading ? (
            <Loading />
        ) : (
            <div className="manage-token-page d-flex flex-column align-items-center mt-5">
                <div>
                    <AddTokenForm
                        username={username}
                        setUsername={setUsername}
                        handleGenerateToken={handleAddToken}
                    />
                </div>
                <div>
                    <TokenList
                        tokens={tokens}
                        handleCopyToken={handleCopyLink}
                        handleDeleteToken={handleDeleteToken}
                        renderTimestamp={(tokenEntry) => {
                            // Show most recent timestamp and its counter, if present
                            const timestamps = Array.isArray(tokenEntry.timestamps) ? tokenEntry.timestamps : [];
                            if (timestamps.length === 0) return <span>No timestamps</span>;
                            const last = timestamps[timestamps.length - 1];
                            return (
                                <span>
                                    Last: {formatTimestamp(last.timestamp)} (count: {last.counter})
                                </span>
                            );
                        }}
                    />
                </div>
            </div>
        )
    );
}