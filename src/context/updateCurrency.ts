import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const updateCurrency = async (
  email: string,
  credits: number
): Promise<void> => {
  try {
    const response = await axios.patch(`${API_URL}/api/credits/update/`, {
      email,
      credits,
    });

    console.log("Updated backend credits:", response.data);
  } catch (error) {
    console.error("Failed to update backend currency:", error);
    throw error;
  }
};