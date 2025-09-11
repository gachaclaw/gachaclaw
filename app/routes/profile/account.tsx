import { useEffect, useState } from "react";
import axios from "axios";
import { fetchUserStats } from "src/context/fetchUserStats";
const API_URL = import.meta.env.VITE_API_URL;

export default function Account() {
  const [email, setEmail] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [emailConfirmationsEnabled, setEC_Enabled] = useState<boolean>(true);
  const [promotionalOffersEnabled, setPO_Enabled] = useState<boolean>(true);

  const toggleEC = () => {
    setEC_Enabled((prev) => !prev);
  };

  const togglePO = () => {
    setPO_Enabled((prev) => !prev);
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
    const storedUserName = localStorage.getItem("username");
    setUsername(storedUserName);

    if (!storedEmail) {
      setError("Not logged in");
      setLoading(false);
      return;
    }

    const fetchCredits = async () => {
      try {
        const {credits} = await fetchUserStats(storedEmail);
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
      <div className="flex items-center gap-2">
  <p>Email: {email ?? "No email found"}</p>
  <button
    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded"
    onClick={() => console.log("Change email clicked")}
  >
    Change
  </button>
</div>

<div className="flex items-center gap-2 mt-2">
  <p>Username: {username ?? "No username found"}</p>
  <button
    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded"
    onClick={() => console.log("Change username clicked")}
  >
    Change
  </button>
</div>
<br></br>
      {loading ? (
        <p>Credits: Loading...</p>
      ) : error ? (
        <p>Credits: Error - {error}</p>
      ) : (
        <p>Credits: {credits}</p>
      )}

      <hr className="my-6 border-gray-600" />
      <h3 className="text-xl font-semibold mb-2">Email Options</h3>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleEC}
          className={`w-6 h-6 flex items-center justify-center rounded border ${
            emailConfirmationsEnabled
              ? "bg-green-500 border-green-500"
              : "bg-gray-700 border-gray-500"
          }`}
        >
          {emailConfirmationsEnabled ? "✔" : ""}
        </button>
        <span className="text-lg">Email Confirmations</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePO}
          className={`w-6 h-6 flex items-center justify-center rounded border ${
            promotionalOffersEnabled
              ? "bg-green-500 border-green-500"
              : "bg-gray-700 border-gray-500"
          }`}
        >
          {promotionalOffersEnabled ? "✔" : ""}
        </button>
        <span className="text-lg">Promotional Offers</span>
      </div>
      <hr className="my-6 border-gray-600" />

      <div className="mt-8">
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
          onClick={() => console.log("Delete account clicked")} // Placeholder for now
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}