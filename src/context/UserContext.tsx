// src/context/auth-context.tsx
import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // You might validate the token here (optional)
      setIsLoggedIn(true);

      // Optionally fetch and set user info if stored
      const savedName = localStorage.getItem("userName");
      const savedEmail = localStorage.getItem("userEmail");
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, name, setName, email, setEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);