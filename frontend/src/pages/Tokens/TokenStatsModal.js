import TokenStats from "./TokenStats";

export default function TokenStatsModal({ open, onClose, tokenData }) {
    if (!open || !tokenData) return null;
    return (
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
            onClick={onClose}
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
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <TokenStats
                    timestamps={tokenData.timestamps}
                    totalMinutes={tokenData.totalMinutes}
                    username={tokenData.username}
                    token={tokenData.token}
                />
            </div>
        </div>
    );
}
