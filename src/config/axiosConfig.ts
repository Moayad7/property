// src/apiClient.ts
import axios from 'axios';
import { BASE_URL } from './env';

const apiClient = axios.create({
  baseURL: BASE_URL, // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all properties
export const getProperties = async () => {
  try {
    const response = await apiClient.get('/properties');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get a unique property by ID
export const getPropertyById = async (id: string) => {
  try {
    const response = await apiClient.get(`/properties/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to get featured properties
export const getFeaturedProperties = async () => {
  try {
    const response = await apiClient.get('/featuredProperties');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get recent properties
export const getRecentProperties = async () => {
  try {
    const response = await apiClient.get('/properties');
    return response.data.slice(-4);
  } catch (error) {
    throw error;
  }
};


// Function to fetch recent properties
export const fetchRecentProperties = async () => {
  try {
    const response = await apiClient.get('/properties');
    return response.data.slice(-4); // Get the last 4 items
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// Function to log in a user
export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to sign up a new user
export const signup = async (userData: { username: string; email: string; password: string}) => {
  try {
    const response = await apiClient.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;