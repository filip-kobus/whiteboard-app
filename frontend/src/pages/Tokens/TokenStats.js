import { useState } from 'react';

export default function TokenStats({ timestamps, totalMinutes, username, token }) {
    function formatTimestamp(ts) {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleString();
    }

    const [showAll, setShowAll] = useState(false);

    const allTimestamps = Array.isArray(timestamps) ? timestamps : [];
    const lastFive = allTimestamps.slice(-5);
    const displayTimestamps = showAll ? allTimestamps : lastFive;

    return (
        <div style={{ minWidth: 250 }}>
            {username && (
                <div className="mb-2">
                    <strong>User:</strong> <span>{username}</span>
                </div>
            )}
            {token && (
                <div className="mb-2">
                    <strong>Token:</strong> <span style={{ wordBreak: "break-all" }}>{token}</span>
                </div>
            )}
            <div className="mb-2">
                <strong>Total minutes:</strong>{" "}
                <span className="text-danger">{typeof totalMinutes === 'number' ? totalMinutes : 0}</span>
            </div>
            <div className="mb-2">
                <strong>Sessions:</strong>
                {displayTimestamps.length > 0 ? (
                    <ul className="list-unstyled mt-2">
                        {displayTimestamps.map((ts, idx) => (
                            <li key={idx} style={{ marginBottom: 4 }}>
                                <span className="text-secondary">{formatTimestamp(ts.timestamp)}</span>
                                {" — "}
                                <span className="text-muted">minutes: {ts.counter}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-muted small">No sessions recorded</div>
                )}
                {!showAll && allTimestamps.length > 5 && (
                    <button
                        className="btn btn-link p-0 mt-1"
                        style={{ fontSize: "0.95em" }}
                        onClick={() => setShowAll(true)}
                    >
                        Show all ({allTimestamps.length})
                    </button>
                )}
                {showAll && allTimestamps.length > 5 && (
                    <button
                        className="btn btn-link p-0 mt-1"
                        style={{ fontSize: "0.95em" }}
                        onClick={() => setShowAll(false)}
                    >
                        Show last 5
                    </button>
                )}
            </div>
        </div>
    );
}