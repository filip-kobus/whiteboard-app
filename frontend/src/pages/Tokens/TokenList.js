import React from 'react';
import { Clipboard, Trash } from 'react-bootstrap-icons';

export default function TokenList({ tokens, handleCopyToken, handleDeleteToken }) {
    return (
        <div className="token-container p-4" style={{ flex: 2 }}>
            <div className="row">
                {tokens.map(({ token, username }, index) => (
                    <div
                        key={index}
                        className="col-md-6 mb-3 d-flex justify-content-between align-items-center"
                    >
                        <span>{username}</span>
                        <div>
                            <Clipboard
                                size={20}
                                className="me-3 icon-hover"
                                onClick={() => handleCopyToken(token)}
                                title="Copy Token"
                            />
                            <Trash
                                size={20}
                                className="icon-hover"
                                onClick={() => handleDeleteToken(token)}
                                title="Remove Token"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
