import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import { fetchUserStats } from "src/context/fetchUserStats";
import { updateUserStats } from "src/context/updateUserStats";


declare global {
  interface Window {
    UpdateCurrencyFromUnity?: (value: string) => void;
    GetCurrency?: () => number;
    TrySpendCurrency?: (amount: number) => boolean;
    UpdatePrizesFromUnity?: (value: string) => void;
    GetPrizesWon?: () => number;
    InitializeUnityGame?: () => void;
  }
}

interface CurrencyContextType {
  currency: number;
  setCurrency: React.Dispatch<React.SetStateAction<number>>;
  prizesWon: number;
  setPrizesWon: (value: number) => void;
  addCredits?: () => void;
  gamesPlayed: number; 
  setGamesPlayed: (value: number) => void;
  creditsSpent: number;
  setCreditsSpent: (value: number) => void;
  refreshStats?: () => Promise<void>;
  isLoading: boolean;
  resetContext?: () => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: 0,
  setCurrency: () => {},
  prizesWon: 0,
  setPrizesWon: () => {},
  gamesPlayed: 0,
  setGamesPlayed: () => {},
  creditsSpent: 0,
  setCreditsSpent: () => {},
  addCredits: () => {},
  refreshStats: async () => {},
  isLoading: true,
  resetContext: () => {},
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState(0);
  const [prizesWon, setPrizesWon] = useState(0);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [creditsSpent, setCreditsSpent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // Track current email to detect user changes
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  // Track if Unity game has been initialized to prevent reset on load
  const [unityInitialized, setUnityInitialized] = useState(false);

  // Initial fetch from backend and re-fetch when user changes
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      const email = localStorage.getItem("email");
      
      // If email hasn't changed and we already have data, don't re-fetch
      if (email === currentEmail && initialFetchDone) {
        setIsLoading(false);
        return;
      }

      if (!email) {
        console.warn("No email found in localStorage");
        setCurrentEmail(null);
        setInitialFetchDone(true);
        setIsLoading(false);
        return;
      }

      try {
        const { credits, prizes_won, games_played, credits_spent } = await fetchUserStats(email);

        console.log("Data from fetchUserStats for user:", email, {
          credits,
          prizes_won,
          games_played,
          credits_spent,
        });
        setCurrency(credits);
        setPrizesWon(prizes_won);
        setGamesPlayed(games_played);
        setCreditsSpent(credits_spent);
        localStorage.setItem("prizesWon", prizes_won.toString());
        setCurrentEmail(email);
        setInitialFetchDone(true); // ✅ Set after initial data is loaded
      } catch (err) {
        console.error("Initialization error:", err);
        // Set default values and mark as done even if fetch fails
        setCurrency(50); // Default credits
        setPrizesWon(0);
        setGamesPlayed(0);
        setCreditsSpent(0);
        setCurrentEmail(email);
        setInitialFetchDone(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [currentEmail, initialFetchDone]); // Re-run when email changes

  // Reset context function - forces re-initialization
  const resetContext = () => {
    console.log("Resetting currency context for new user");
    setInitialFetchDone(false);
    setCurrentEmail(null);
    setCurrency(0);
    setPrizesWon(0);
    setGamesPlayed(0);
    setCreditsSpent(0);
    setIsLoading(true);
    setUnityInitialized(false); // Reset Unity initialization flag
  };

  // Refresh stats function
  const refreshStats = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.warn("No email found in localStorage");
      return;
    }

    try {
      setIsLoading(true);
      const { credits, prizes_won, games_played, credits_spent } = await fetchUserStats(email);
      setCurrency(credits);
      setPrizesWon(prizes_won);
      setGamesPlayed(games_played);
      setCreditsSpent(credits_spent);
      localStorage.setItem("prizesWon", prizes_won.toString());
    } catch (err) {
      console.error("Error refreshing stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
  if (!initialFetchDone) return; // ❌ Skip if initial fetch hasn't happened yet

  const previousPrizes = localStorage.getItem("prizesWon");
  const shouldUpdate =
    previousPrizes !== null && parseInt(previousPrizes) !== prizesWon;

  if (!shouldUpdate) return;

  const syncPrizes = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      await updateUserStats({ email, prizes_won: prizesWon });
      localStorage.setItem("prizesWon", prizesWon.toString());
    } catch (err) {
      console.error("Failed to sync prizes to backend:", err);
    }
  };

  syncPrizes();
}, [prizesWon, initialFetchDone]);

  // Setup Unity bridge
  useEffect(() => {
    window.UpdateCurrencyFromUnity = (value: string) => {
      console.log("UpdateCurrencyFromUnity called with value:", value);
      setCurrency(parseInt(value));
    };

    window.UpdatePrizesFromUnity = (value: string) => {
      console.log("UpdatePrizesFromUnity called with value:", value, "Unity initialized:", unityInitialized);
      const newPrizes = parseInt(value);
      
      // If Unity hasn't been initialized yet and it's trying to set prizes to 0, ignore it
      // This prevents the game from resetting user's accumulated prizes on load
      if (!unityInitialized && newPrizes === 0) {
        console.log("Ignoring Unity initialization - would reset prizes to 0");
        setUnityInitialized(true);
        return;
      }
      
      // If Unity is initialized, allow the update
      if (unityInitialized || newPrizes > 0) {
        console.log("Updating prizes from", prizesWon, "to", newPrizes);
        setPrizesWon(newPrizes);
        setUnityInitialized(true);
      }
    };

    window.GetCurrency = () => currency;
    window.GetPrizesWon = () => prizesWon;
    
    window.InitializeUnityGame = () => {
      console.log("Unity game initialization called");
      setUnityInitialized(true);
    };

    window.TrySpendCurrency = (amount: number) => {
  if (currency >= amount) {
    const newVal = currency - amount;
    const newGamesPlayed = gamesPlayed + 1;
    const newCreditsSpent = creditsSpent + amount;
    const email = localStorage.getItem("email");

    if (email) {
      updateUserStats({
        email,
        credits: newVal,
        games_played: newGamesPlayed,
        credits_spent: newCreditsSpent,
      }).catch((err) => {
        console.error("Error updating backend stats after spend:", err);
      });
    }

    setCurrency(newVal);
    setGamesPlayed(newGamesPlayed);
    setCreditsSpent(newCreditsSpent);

    return true;
  }
  return false;
};
  }, [currency, gamesPlayed, creditsSpent]);

  // Add credits manually
  const handleAddCredits = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("No email found in localStorage.");
      return;
    }

    const newVal = currency + 5;

    try {
      await updateUserStats({ email, credits: newVal });
      setCurrency(newVal);
    } catch (err) {
      console.error("Error updating credits:", err);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{ 
        currency, 
        setCurrency, 
        prizesWon, 
        setPrizesWon, 
        gamesPlayed, 
        setGamesPlayed,
        creditsSpent, 
        setCreditsSpent,
        addCredits: handleAddCredits,
        refreshStats,
        isLoading,
        resetContext
      }}
    >
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