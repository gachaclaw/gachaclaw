import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useContext } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

declare global {
  interface Window {
    UpdateCurrencyFromUnity?: (value: string) => void;
    GetCurrency?: () => number;
    TrySpendCurrency?: (amount: number) => boolean;
    UpdatePrizesFromUnity?: (value: string) => void;
  }
}

interface CurrencyContextType {
  currency: number;
  setCurrency: React.Dispatch<React.SetStateAction<number>>;
  prizesWon: number;
  setPrizesWon: (value: number) => void;
  addCredits?: () => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: 0,
  setCurrency: () => {},
  prizesWon: 0,
  setPrizesWon: () => {},
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState(0);
  const [prizesWon, setPrizesWon] = useState(0);

  useEffect(() => {
  const fetchCredits = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      const res = await axios.get(`${API_URL}/api/credits/`, { params: { email } });
      setCurrency(res.data.credits);
    } catch (err) {
      console.error("Fetch credits failed", err);
    }
  };
  fetchCredits();
}, []);
  useEffect(() => {
    window.UpdateCurrencyFromUnity = (value: string) => {
      setCurrency(parseInt(value));
    };

    window.UpdatePrizesFromUnity = (value: string) => {
      setPrizesWon(parseInt(value));
    };

    window.GetCurrency = () => currency;

    window.TrySpendCurrency = (amount: number) => {
  if (currency >= amount) {
    const newVal = currency - amount;
    const email = localStorage.getItem("email");

    if (email) {
      axios.patch(`${API_URL}/api/credits/update/`, {
        email,
        credits: newVal,
      }).catch(err => {
        console.error("Error updating backend credits after spend:", err);
      });
    }

    setCurrency(newVal);
    return true;
  }
  return false;
};
  }, [currency]);
const handleAddCredits = async () => {
  const email = localStorage.getItem("email");

  if (!email) {
    console.error("No email found in localStorage.");
    return;
  }

  const newVal = currency + 5;
  console.log(`Sending PATCH request to update credits to ${newVal} for ${email}`);

  try {
    const response = await axios.patch(`${API_URL}/api/credits/update/`, {
      email,
      credits: newVal,
    });

    console.log("PATCH response:", response.data);
    setCurrency(newVal); // Optional: sync local state with updated value
  } catch (err) {
    console.error("Error updating credits:", err);
  }
};

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, prizesWon, setPrizesWon, addCredits: handleAddCredits }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};