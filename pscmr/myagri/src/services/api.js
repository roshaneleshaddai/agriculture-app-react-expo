import axios from "axios";
import { API_BASE_URL } from "../config/config";
// const API_BASE_URL = "http://192.168.56.1:5000/api/users";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    console.log("User registered:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);

    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios setup error:", error.message);
    }
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};