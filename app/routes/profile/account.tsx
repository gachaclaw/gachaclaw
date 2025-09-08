import { useEffect, useState } from "react";
import axios from "axios";

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

    console.log("Requesting credits for email:", storedEmail);

    const fetchCredits = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/credits/`, {
          params: { email: storedEmail },
        });
        console.log("Credits response data:", res.data);

        if (res.data.credits !== undefined) {
          setCredits(res.data.credits);
        } else {
          setError("No credits data returned");
        }
      } catch (err: any) {
        console.error("Axios error fetching credits:", err);
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