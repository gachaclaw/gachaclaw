// Keys used in localStorage
const keys = {
  email: "email",
  username: "username",
  authToken: "authToken",
  profilePictureUrl: "profilePictureUrl",
  prizes: "prizes",
  credits: "credits",
  gamesPlayed: "games_played",
  creditsSpent: "credits_spent",
};

// Remove all user-related localStorage data
export const clearUserStorage = () => {
  Object.values(keys).forEach((key) => localStorage.removeItem(key));
};

// Set user stats
export const setUserStorage = (data: {
  email: string;
  username: string;
  authToken: string;
  profilePictureUrl?: string | null;
  prizes_won?: number;
  credits?: number;
  games_played?: number;
  credits_spent?: number;
}) => {
  localStorage.setItem(keys.email, data.email);
  localStorage.setItem(keys.username, data.username);
  localStorage.setItem(keys.authToken, data.authToken);
  if (data.profilePictureUrl) {
    localStorage.setItem(keys.profilePictureUrl, data.profilePictureUrl);
  }
  if (data.prizes_won !== undefined) {
    localStorage.setItem(keys.prizes, data.prizes_won.toString());
  }
  if (data.credits !== undefined) {
    localStorage.setItem(keys.credits, data.credits.toString());
  }
  if (data.games_played !== undefined) {
    localStorage.setItem(keys.gamesPlayed, data.games_played.toString());
  }
  if (data.credits_spent !== undefined) {
    localStorage.setItem(keys.creditsSpent, data.credits_spent.toString());
  }
};

// Get stored stats (example)
export const getPrizes = (): number => {
  return Number(localStorage.getItem(keys.prizes) ?? "0");
};

export const getCredits = (): number => {
  return Number(localStorage.getItem(keys.credits) ?? "0");
};