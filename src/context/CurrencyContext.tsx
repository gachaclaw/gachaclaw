import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useContext } from "react";

declare global {
  interface Window {
    UpdateCurrencyFromUnity?: (value: string) => void;
    GetCurrency?: () => number;
    TrySpendCurrency?: (amount: number) => boolean;
  }
}

interface CurrencyContextType {
  currency: number;
  setCurrency: (value: number) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: 0,
  setCurrency: () => {},
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState(20);

  useEffect(() => {
    window.UpdateCurrencyFromUnity = (value: string) => {
      setCurrency(parseInt(value));
    };

    window.GetCurrency = () => currency;

    window.TrySpendCurrency = (amount: number) => {
      if (currency >= amount) {
        setCurrency(prev => prev - amount);
        return true;
      }
      return false;
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
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
