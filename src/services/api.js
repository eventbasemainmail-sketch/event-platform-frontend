import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://event-platform-api-production-0ca8.up.railway.app/api",
});

export default api;