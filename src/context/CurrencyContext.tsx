import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useContext } from "react";
import { fetchCurrency } from "src/context/fetchCurrency";
import { updateCurrency } from "src/context/updateCurrency";
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
    const fetchInitialCredits = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;

      try {
        const credits = await fetchCurrency(email);
        setCurrency(credits);
      } catch (err) {
        console.error("Failed to fetch initial credits:", err);
      }
    };

    fetchInitialCredits();
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
      updateCurrency(email, newVal).catch(err => {
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
      await updateCurrency(email, newVal);
      setCurrency(newVal);
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