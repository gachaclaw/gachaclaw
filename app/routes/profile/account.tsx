import { useEffect, useState } from "react";
import axios from "axios";
import { fetchCurrency } from "src/context/fetchCurrency";
const API_URL = import.meta.env.VITE_API_URL;

export default function Account() {
  const [email, setEmail] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);

    if (!storedEmail) {
      setError("Not logged in");
      setLoading(false);
      return;
    }

    const fetchCredits = async () => {
      try {
        const credits = await fetchCurrency(storedEmail);
        setCredits(credits);
        console.log("Fetched credits from backend:", credits);
      } catch (err: any) {
        console.error("Error fetching credits:", err);
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">ACCOUNT</h2>
      <p>Email: {email ?? "No email found"}</p>
      {loading ? (
        <p>Credits: Loading...</p>
      ) : error ? (
        <p>Credits: Error - {error}</p>
      ) : (
        <p>Credits: {credits}</p>
      )}
    </div>
  );
}