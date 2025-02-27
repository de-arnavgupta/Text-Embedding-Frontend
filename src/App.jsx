import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");
    const [embedding, setEmbedding] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchEmbedding = async () => {
        if (!message.trim()) return;

        setLoading(true);
        setError("");
        setEmbedding(null);

        try {
            const response = await axios.get(
                `http://localhost:8080/embed?message=${encodeURIComponent(message)}`
            );
            setEmbedding(response.data.embedding);
        }catch (err) {
            setError(`Failed to fetch embedding: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Text Embedding App</h1>
            <input
                type="text"
                placeholder="Enter text to embed..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={fetchEmbedding} disabled={loading}>
                {loading ? "Fetching..." : "Get Embedding"}
            </button>

            {error && <p className="error">{error}</p>}

            {embedding && (
                <div className="embedding-output">
                    <h2>Embedding:</h2>
                    <pre>{JSON.stringify(embedding, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
