// settings.js
import axios from "axios";
import { API_ROUTES } from "@/utils/apiConfig";
export const fetchSettings = async () => {
  try {
    const response = await axios.get(API_ROUTES.settings.get);
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
};
