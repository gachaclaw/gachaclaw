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
  theme?: string;
  language?: string;
  timezone?: string;
  time_format?: string;
  show_animations?: boolean;
  show_tips?: boolean;
  confirm_spend?: boolean;
  autoplay?: boolean;
  game_resolution?: string;
  game_theme?: string;
  game_speed?: string;
  music_volume?: number;
  sfx_volume?: number;
}

export const updateUserStats = async ({
  email,
  credits,
  prizes_won,
  games_played,
  credits_spent,
  email_confirmations_enabled,
  promotional_offers_enabled,
  theme,
  language,
  timezone,
  time_format,
  show_animations,
  show_tips,
  confirm_spend,
  autoplay,
  game_resolution,
  game_theme,
  game_speed,
  music_volume,
  sfx_volume,
}: UpdateUserStatsProps): Promise<{
  credits: number;
  prizes_won: number;
  games_played: number;
  credits_spent: number;
  email_confirmations_enabled: boolean;
  promotional_offers_enabled: boolean;
  theme: string;
  language: string;
  timezone: string;
  time_format: string;
  show_animations: boolean;
  show_tips: boolean;
  confirm_spend: boolean;
  autoplay: boolean;
  game_resolution: string;
  game_theme: string;
  game_speed: string;
  music_volume: number;
  sfx_volume: number;
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
  if (theme !== undefined) payload.theme = theme;
  if (language !== undefined) payload.language = language;
  if (timezone !== undefined) payload.timezone = timezone;
  if (time_format !== undefined) payload.time_format = time_format;
  if (show_animations !== undefined) payload.show_animations = show_animations;
  if (show_tips !== undefined) payload.show_tips = show_tips;
  if (confirm_spend !== undefined) payload.confirm_spend = confirm_spend;
  if (autoplay !== undefined) payload.autoplay = autoplay;
  if (game_resolution !== undefined) payload.game_resolution = game_resolution;
  if (game_theme !== undefined) payload.game_theme = game_theme;
  if (game_speed !== undefined) payload.game_speed = game_speed;
  if (music_volume !== undefined) payload.music_volume = music_volume;
  if (sfx_volume !== undefined) payload.sfx_volume = sfx_volume;

  try {
    const res = await axios.patch(`${API_URL}/api/update-user-stats/`, payload);
    console.log("Updated user stats:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating user stats:", error);
    throw error;
  }
};