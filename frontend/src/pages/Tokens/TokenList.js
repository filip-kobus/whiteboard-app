import { Clipboard, Trash } from 'react-bootstrap-icons';

export default function TokenList({ tokens, handleCopyToken, handleDeleteToken }) {
    // Helper to format timestamp
    function formatTimestamp(ts) {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleString();
    }

    return (
        <div className="token-container p-4" style={{ flex: 2 }}>
            <div className={`row ${tokens.length < 2 ? 'justify-content-center' : ''}`}>
                {tokens.map(({ token, username, timestamps }, index) => {
                    // Prepare timestamp display
                    let timestampDisplay = <span className="text-muted small">No timestamps</span>;
                    if (Array.isArray(timestamps) && timestamps.length > 0) {
                        const lastTs = timestamps[timestamps.length - 1];
                        timestampDisplay = (
                            <span className="text-muted small">
                                Last: {formatTimestamp(lastTs.timestamp)} (count: {lastTs.counter})
                            </span>
                        );
                    }
                    return (
                        <div
                            key={index}
                            className="col-md-6 mb-3 d-flex justify-content-between align-items-center gap-2"
                        >
                            <div className="d-flex flex-column">
                                <span>{username}</span>
                                {timestampDisplay}
                            </div>
                            <div className="d-flex align-items-center">
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
                    );
                })}
            </div>
        </div>
    );
}