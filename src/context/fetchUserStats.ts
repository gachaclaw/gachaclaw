import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

type Stats = {
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
};

export const fetchUserStats = async (email: string): Promise<Stats> => {
  if (!API_URL) {
    console.warn("API_URL is not defined, returning default stats");
    return {
      credits: 50,
      prizes_won: 0,
      games_played: 0,
      credits_spent: 0,
      email_confirmations_enabled: true,
      promotional_offers_enabled: true,
      theme: 'light',
      language: 'en',
      timezone: 'CST',
      time_format: 'military',
      show_animations: true,
      show_tips: true,
      confirm_spend: true,
      autoplay: false,
      game_resolution: '1920x1080',
      game_theme: 'Classic',
      game_speed: 'Normal',
      music_volume: 50,
      sfx_volume: 50,
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
      email_confirmations_enabled: Boolean(d.email_confirmations_enabled ?? true),
      promotional_offers_enabled: Boolean(d.promotional_offers_enabled ?? true),
      theme: String(d.theme ?? 'light'),
      language: String(d.language ?? 'en'),
      timezone: String(d.timezone ?? 'CST'),
      time_format: String(d.time_format ?? 'military'),
      show_animations: Boolean(d.show_animations ?? true),
      show_tips: Boolean(d.show_tips ?? true),
      confirm_spend: Boolean(d.confirm_spend ?? true),
      autoplay: Boolean(d.autoplay ?? false),
      game_resolution: String(d.game_resolution ?? '1920x1080'),
      game_theme: String(d.game_theme ?? 'Classic'),
      game_speed: String(d.game_speed ?? 'Normal'),
      music_volume: Number(d.music_volume ?? 50),
      sfx_volume: Number(d.sfx_volume ?? 50),
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
      email_confirmations_enabled: true,
      promotional_offers_enabled: true,
      theme: 'light',
      language: 'en',
      timezone: 'CST',
      time_format: 'military',
      show_animations: true,
      show_tips: true,
      confirm_spend: true,
      autoplay: false,
      game_resolution: '1920x1080',
      game_theme: 'Classic',
      game_speed: 'Normal',
      music_volume: 50,
      sfx_volume: 50,
    };
  }
};