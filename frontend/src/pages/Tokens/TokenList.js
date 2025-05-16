import { Clipboard, Trash } from 'react-bootstrap-icons';
import TokenStats from "./TokenStats";
import { useState } from 'react';

export default function TokenList({ tokens, handleCopyToken, handleDeleteToken, handleViewStats }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState(null);

    const openStatsModal = (tokenData) => {
        setSelectedToken(tokenData);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedToken(null);
    };

    return (
        <div className="token-container p-4" style={{ flex: 2 }}>
            <div className={`row ${tokens.length < 2 ? 'justify-content-center' : ''}`}>
                {tokens.map((tokenObj, index) => (
                    <div
                        key={index}
                        className="col-md-6 mb-3 d-flex justify-content-between align-items-center gap-2"
                    >
                        <div className="d-flex flex-column">
                            <span>{tokenObj.username}</span>
                            {/* View Stats link under each token */}
                            <a
                                href="#"
                                className="small text-primary mt-1"
                                style={{ width: "fit-content" }}
                                onClick={e => {
                                    e.preventDefault();
                                    openStatsModal(tokenObj);
                                }}
                            >
                                View Stats
                            </a>
                        </div>
                        <div className="d-flex align-items-center">
                            <Clipboard
                                size={20}
                                className="me-3 icon-hover"
                                onClick={() => handleCopyToken(tokenObj.token)}
                                title="Copy Token"
                            />
                            <Trash
                                size={20}
                                className="icon-hover"
                                onClick={() => handleDeleteToken(tokenObj.token)}
                                title="Remove Token"
                            />
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && selectedToken && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.4)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onClick={closeModal}
                >
                    <div
                        style={{
                            background: "#fff",
                            padding: "2rem",
                            borderRadius: "8px",
                            minWidth: "320px",
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            position: "relative"
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                border: "none",
                                background: "transparent",
                                fontSize: "1.5rem",
                                cursor: "pointer"
                            }}
                            onClick={closeModal}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <TokenStats
                            timestamps={selectedToken.timestamps}
                            totalMinutes={selectedToken.totalMinutes}
                            username={selectedToken.username}
                            token={selectedToken.token}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}