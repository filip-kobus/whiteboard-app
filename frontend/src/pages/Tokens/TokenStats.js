export default function TokenStats({ timestamps, totalMinutes, username, token }) {
    function formatTimestamp(ts) {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleString();
    }

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
                {Array.isArray(timestamps) && timestamps.length > 0 ? (
                    <ul className="list-unstyled mt-2">
                        {timestamps.map((ts, idx) => (
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
            </div>
        </div>
    );
}