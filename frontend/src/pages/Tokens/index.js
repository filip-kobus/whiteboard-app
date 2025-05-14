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
                const response = await fetch(`${process.env.REACT_APP_API_URL}/gettokens?boardId=${boardId}`);
                setIsLoading(true);
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

    const handleCopyToken = (token) => {
        navigator.clipboard.writeText(token).then(() => {
            alert('Token copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy token:', err);
        });
    };

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
                        handleCopyToken={handleCopyToken}
                        handleDeleteToken={handleDeleteToken}
                    />
                </div>
            </div>
        )      
    );
}