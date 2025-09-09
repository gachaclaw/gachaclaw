import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCurrency = async (email: string): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}/api/credits/`, {
      params: { email },
    });

    const credits = response.data.credits;
    console.log("Fetched backend credits:", credits);
    return credits;
  } catch (error) {
    console.error("Failed to fetch backend currency:", error);
    throw error;
  }
};