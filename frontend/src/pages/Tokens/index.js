import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddTokenForm from './AddTokenForm';
import TokenList from './TokenList';
import './ManageTokenForm.css';

export default function ManageToken() {
    const { boardId } = useParams();
    const [tokens, setTokens] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch tokens for the board
        const fetchTokens = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tokens?boardId=${boardId}`);
                if (!response.ok) throw new Error('Failed to fetch tokens');
                const data = await response.json();
                setTokens(data.tokens || []);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            }
        };

        fetchTokens();
    }, [boardId]);

    const handleGenerateToken = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            alert('Please enter a valid username.');
            return;
        }
        const generatedToken = `token_${Math.random().toString(36).substring(2, 15)}`;
        const newToken = { token: generatedToken, username: username.trim() };

        try {
            // Send the new token to the backend
            await fetch(`${process.env.REACT_APP_API_URL}/addtoken`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardId, ...newToken }),
            });

            setTokens((prevTokens) => [...prevTokens, newToken]);
            setUsername('');
        } catch (error) {
            console.error('Error adding token:', error);
        }
    };

    const handleCopyToken = (token) => {
        navigator.clipboard.writeText(token).then(() => {
            alert('Token copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy token:', err);
        });
    };

    const handleDeleteToken = async (tokenToDelete) => {
        try {
            // Delete the token from the backend
            await fetch(`${process.env.REACT_APP_API_URL}/removetoken`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardId, token: tokenToDelete }),
            });

            setTokens((prevTokens) => prevTokens.filter((token) => token.token !== tokenToDelete));
        } catch (error) {
            console.error('Error deleting token:', error);
        }
    };

    return (
        <div className="manage-token-page d-flex flex-column align-items-center mt-5">
            <div>
                <AddTokenForm
                    username={username}
                    setUsername={setUsername}
                    handleGenerateToken={handleGenerateToken}
                />
            </div>
            <div>
                <TokenList
                    tokens={tokens}
                    handleCopyToken={handleCopyToken}
                    handleDeleteToken={handleDeleteToken}
                />
            </div>
        </div>
    );
}