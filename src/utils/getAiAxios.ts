import axios from "axios";

function getAiAxios() {
  const instance = axios.create({
    timeout: 3000000,
    baseURL: "https://api.openai.com/v1/chat/completions"
  });

  instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_KEY}`;
    return config;
  });

  return instance;
}

export default getAiAxios;