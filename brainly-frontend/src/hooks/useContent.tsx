import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../pages/config";

export function useContent() {
    const [contents, setContents] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchContent() {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            console.log("Full API Response:", response.data); // Debugging API response

            if (Array.isArray(response.data.content)) {
                setContents(response.data.content);
            } else {
                console.error("Unexpected response format:", response.data);
                setContents([]); // Ensure it's always an array
            }
        } catch (err) {
            setError("Failed to fetch content");
            console.error("Error fetching content:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchContent();

        const interval = setInterval(() => {
            fetchContent();
        }, 30 * 1000); // Fetch every 30 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return { contents, error, loading, fetchContent };
}
