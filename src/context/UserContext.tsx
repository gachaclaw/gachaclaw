// src/context/auth-context.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  profilePictureUrl: string | null;
  setProfilePictureUrl: (url: string | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    const savedAvatar = localStorage.getItem("profilePictureUrl");

    if (token) {
      setIsLoggedIn(true);
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      if (savedAvatar) setProfilePictureUrl(savedAvatar);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        name,
        setName,
        email,
        setEmail,
        profilePictureUrl,
        setProfilePictureUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
