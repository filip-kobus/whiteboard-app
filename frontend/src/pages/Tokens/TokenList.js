import { Clipboard, Trash, BarChart } from 'react-bootstrap-icons';
import { useState } from 'react';
import TokenStatsModal from "./TokenStatsModal";

export default function TokenList({ tokens, handleCopyToken, handleDeleteToken }) {
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
        <div
            className="token-container p-4"
            style={{
                flex: 2,
                width: "60vw",
                maxWidth: "60vw",
                boxSizing: "border-box",
                margin: "0 auto"
            }}
        >
            <div
                className="row"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1.5rem",
                    width: "100%",
                    margin: 0
                }}
            >
                {tokens.map((tokenObj, index) => (
                    <div
                        key={index}
                        className="token-card d-flex flex-column justify-content-between align-items-start p-3"
                        style={{
                            background: "#f8f9fa",
                            borderRadius: "10px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            minHeight: "100px",
                            height: "100%",
                            border: "1px solid #e0e0e0"
                        }}
                    >
                        <div className="d-flex flex-column w-100 mb-2">
                            <span className="fw-bold mb-1">{tokenObj.username}</span>
                        </div>
                        <div className="d-flex align-items-center mt-auto w-100 gap-1">
                            <Clipboard
                                size={20}
                                className="me-3 icon-hover"
                                onClick={() => handleCopyToken(tokenObj.token)}
                                title="Copy Token"
                                style={{ cursor: "pointer" }}
                            />
                            <BarChart
                                size={22}
                                className="me-3 icon-hover"
                                style={{ cursor: "pointer" }}
                                title="View Stats"
                                onClick={() => openStatsModal(tokenObj)}
                            />
                            <Trash
                                size={20}
                                className="me-3 icon-hover"
                                onClick={() => handleDeleteToken(tokenObj.token)}
                                title="Remove Token"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && selectedToken && (
                <TokenStatsModal
                    open={modalOpen}
                    onClose={closeModal}
                    tokenData={selectedToken}
                />
            )}
        </div>
    );
}