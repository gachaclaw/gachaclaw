import { useCurrency, CurrencyProvider } from "src/context/CurrencyContext"
import React, { useRef, useState } from "react";
import { useAuth } from "src/context/UserContext";
import axios from "axios";
export default function MyProfile(){
  const { currency } = useCurrency();
  const { email, profilePictureUrl, setProfilePictureUrl } = useAuth();
    // Ref to trigger hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const BASE_URL = "http://localhost:8000"; // Django backend
  // Called when button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Open file explorer
  };

  // Called when user selects a file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file || !email) {
    console.warn("Missing file or email", { file, email });
    return;
  }

  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("email", email); // match Django expectation

  console.log("Uploading to: http://127.0.0.1:8000/api/upload-avatar/");
  console.log("FormData contents:", formData);

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/upload-avatar/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const newAvatarUrl = res.data.avatar_url;
    setProfilePictureUrl(newAvatarUrl); // ⬅️ update global state
    localStorage.setItem("profilePictureUrl", newAvatarUrl); // ⬅️ persist

    console.log("✅ Avatar uploaded successfully:", newAvatarUrl);
  } catch (err) {
    console.error("❌ Upload failed:", err);
  }
};
    return (
  <>
    <div className="space-y-6 text-white">
      <div className="text-2xl font-bold">Profile</div>

      <div className="flex items-center gap-4">
          <img
  alt="Profile"
  src={
    profilePictureUrl
      ? profilePictureUrl.startsWith("http")
        ? profilePictureUrl
        : `${BASE_URL}${profilePictureUrl}`
      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..."
  }
  className="size-16 rounded-full object-cover"
/>
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded"
          onClick={handleButtonClick}
        >
          Change Profile Picture
        </button>
        {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
      </div>

      <p>Credits Owned: {currency}</p>
    </div>
  </>
);
}