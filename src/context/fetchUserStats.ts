import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

type Stats = {
  credits: number;
  prizes_won: number;
  games_played: number;
  credits_spent: number;
};

export const fetchUserStats = async (email: string): Promise<Stats> => {
  if (!API_URL) {
    console.warn("API_URL is not defined, returning default stats");
    return {
      credits: 50,
      prizes_won: 0,
      games_played: 0,
      credits_spent: 0,
    };
  }

  try {
    const res = await axios.get(`${API_URL}/api/update-user-stats/`, { params: { email } });

    // Log raw payload to be 100% sure what we got
    console.log("RAW /update-user-stats:", res.data);

    const d = res.data ?? {};
    // Coerce to numbers and default to 0
    const stats: Stats = {
      credits: Number(d.credits ?? 0),
      prizes_won: Number(d.prizes_won ?? 0),
      games_played: Number(d.games_played ?? 0),
      credits_spent: Number(d.credits_spent ?? 0),
    };

    console.log("Normalized user stats:", stats);
    return stats;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    // Return default stats if API call fails
    return {
      credits: 50,
      prizes_won: 0,
      games_played: 0,
      credits_spent: 0,
    };
  }
};