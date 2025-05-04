export default function CloseButton({ onClick }) {
    return (
        <button
            className="btn btn-secondary position-absolute top-0 end-0 m-3"
            onClick={onClick}
            style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "black",
            }}
            aria-label="Close"
        >
            &times;
        </button>
    );
}