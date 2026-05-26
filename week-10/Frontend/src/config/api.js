import axios from 'axios';

// API Base URL - use environment variable or default to Render backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mernstack-3-pnqa.onrender.com';

// Create axios instance with base URL
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default API_BASE_URL;
