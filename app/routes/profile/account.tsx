import { useEffect, useState } from "react";
import axios from "axios";
import { fetchUserStats } from "src/context/fetchUserStats";
import { updateUserStats } from "src/context/updateUserStats";
const API_URL = import.meta.env.VITE_API_URL;

export default function Account() {
  const [email, setEmail] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [emailConfirmationsEnabled, setEC_Enabled] = useState<boolean>(true);
  const [promotionalOffersEnabled, setPO_Enabled] = useState<boolean>(true);

  const toggleEC = async () => {
    const newValue = !emailConfirmationsEnabled;
    setEC_Enabled(newValue);
    
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      try {
        await updateUserStats({ 
          email: storedEmail, 
          email_confirmations_enabled: newValue 
        });
        console.log("Email confirmations updated:", newValue);
      } catch (err) {
        console.error("Error updating email confirmations:", err);
        // Revert on error
        setEC_Enabled(!newValue);
      }
    }
  };

  const togglePO = async () => {
    const newValue = !promotionalOffersEnabled;
    setPO_Enabled(newValue);
    
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      try {
        await updateUserStats({ 
          email: storedEmail, 
          promotional_offers_enabled: newValue 
        });
        console.log("Promotional offers updated:", newValue);
      } catch (err) {
        console.error("Error updating promotional offers:", err);
        // Revert on error
        setPO_Enabled(!newValue);
      }
    }
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

    const fetchUserData = async () => {
      try {
        const data = await fetchUserStats(storedEmail);
        setCredits(data.credits);
        setEC_Enabled(data.email_confirmations_enabled);
        setPO_Enabled(data.promotional_offers_enabled);
        console.log("Fetched user data from backend:", data);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
    </div>
  );
}