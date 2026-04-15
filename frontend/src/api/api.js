import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const generateImage = (prompt) => {
  return axios.post(
    `${API_URL}/api/generate`,
    { prompt: prompt },
    { responseType: "arraybuffer" }
  );
};