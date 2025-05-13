import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddTokenForm({ username, setUsername, handleGenerateToken }) {
    return (
        <div className="token-container p-4 me-4 d-flex flex-column align-items-center" style={{ flex: 1 }}>
            <h2 className="title mb-4 text-center">Add Tokens</h2>
            <Form className="form" style={{ width: '100%', maxWidth: '400px' }}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <div className="d-flex align-items-center gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button
                            className="submit-button mb-3"
                            type="submit"
                            onClick={handleGenerateToken}
                        >
                            Generate Token
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
}
