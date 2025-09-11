import { useState } from "react";
import { useNavigate } from "react-router";
import { useCurrency } from "src/context/CurrencyContext";
import { useAuth } from "src/context/UserContext";
import { updateUserStats } from "src/context/updateUserStats";
import { clearUserStorage } from "src/context/storage";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Security() {
  const navigate = useNavigate();
  const { currency, addCredits, resetContext } = useCurrency();
  const { setIsLoggedIn, setName, setEmail, setProfilePictureUrl } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState<string>("");

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteConfirmText(""); // Clear the input when canceling
  };

  const handleDeleteConfirm = async () => {
    // Check if user typed "delete" correctly
    if (deleteConfirmText.toLowerCase() !== "delete") {
      alert('Please type "delete" to confirm account deletion.');
      return;
    }

    const email = localStorage.getItem("email");
    if (!email) {
      console.error("No email found for account deletion");
      return;
    }

    setIsDeleting(true);

    try {
      // Call backend to delete user account
      if (API_URL) {
        await axios.delete(`${API_URL}/api/delete-account/`, {
          data: { email }
        });
      }

      // Clear all user data from frontend
      clearUserStorage();
      resetContext?.();
      setIsLoggedIn(false);
      setName("");
      setEmail("");
      setProfilePictureUrl(null);

      // Close modal and redirect
      setShowDeleteConfirm(false);
      setDeleteConfirmText(""); // Clear input
      navigate("/");
      
      console.log("Account successfully deleted");
    } catch (error) {
      console.error("Error deleting account:", error);
      // Show error to user but still close modal
      alert("There was an error deleting your account. Please try again or contact support.");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  return (
    <div className="p-4 space-y-4 text-white">
      <h2 className="text-2xl font-bold">SECURITY</h2>
      <p>Credits: {currency}</p>
      <button
        onClick={addCredits}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add 5 Credits
      </button>
      <hr className="my-6 border-gray-600" />
      <div className="flex items-center gap-2">
        <p className="text-lg">
          Two-Step Verification: <span className="font-semibold">Enabled</span>
        </p>
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded"
          onClick={() => console.log("Change two-step verification clicked")}
        >
          Change
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">Password</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Existing password:</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1">New password:</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1">Confirm new password:</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => console.log("Save password clicked")} // placeholder
        >
          Save
        </button>
      </div>

      <hr className="my-6 border-gray-600" />

      {/* Advanced Section */}
      <div className="mt-8">
        <button
          onClick={toggleAdvanced}
          className="flex items-center gap-2 text-xl font-semibold text-white hover:text-gray-300 transition-colors"
        >
          <span>Advanced</span>
          <span className={`transform transition-transform ${showAdvanced ? 'rotate-90' : ''}`}>
            ▶
          </span>
        </button>
        
        {showAdvanced && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h4 className="text-lg font-medium text-white mb-3">Danger Zone</h4>
            <p className="text-gray-400 text-sm mb-4">
              These actions are permanent and cannot be undone.
            </p>
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
              onClick={handleDeleteClick}
            >
              Delete Account
            </button>
          </div>
        )}
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Account</h3>
            <p className="text-gray-300 mb-4">
              This action cannot be undone and you will lose all your data, including:
            </p>
            <ul className="text-gray-300 mb-6 list-disc list-inside">
              <li>All your credits and progress</li>
              <li>Your game history and stats</li>
              <li>Your profile settings</li>
              <li>Any prizes won</li>
            </ul>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-3">
                To confirm, type <span className="font-bold text-red-400">"delete"</span> in the box below:
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type delete here"
                disabled={isDeleting}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-500 disabled:opacity-50"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting || deleteConfirmText.toLowerCase() !== "delete"}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
