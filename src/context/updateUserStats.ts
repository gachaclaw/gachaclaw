import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface UpdateUserStatsProps {
  email: string;
  credits?: number;
  prizes_won?: number;
  games_played?: number;
  credits_spent?: number;
  email_confirmations_enabled?: boolean;
  promotional_offers_enabled?: boolean;
}

export const updateUserStats = async ({
  email,
  credits,
  prizes_won,
  games_played,
  credits_spent,
  email_confirmations_enabled,
  promotional_offers_enabled,
}: UpdateUserStatsProps): Promise<{
  credits: number;
  prizes_won: number;
  games_played: number;
  credits_spent: number;
  email_confirmations_enabled: boolean;
  promotional_offers_enabled: boolean;
}> => {
  if (!API_URL) {
    console.warn("API_URL is not defined, cannot update user stats");
    throw new Error("API_URL is not configured");
  }

  const payload: any = { email };

  if (credits !== undefined) payload.credits = credits;
  if (prizes_won !== undefined) payload.prizes_won = prizes_won;
  if (games_played !== undefined) payload.games_played = games_played;
  if (credits_spent !== undefined) payload.credits_spent = credits_spent;
  if (email_confirmations_enabled !== undefined) payload.email_confirmations_enabled = email_confirmations_enabled;
  if (promotional_offers_enabled !== undefined) payload.promotional_offers_enabled = promotional_offers_enabled;

  try {
    const res = await axios.patch(`${API_URL}/api/update-user-stats/`, payload);
    console.log("Updated user stats:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating user stats:", error);
    throw error;
  }
};