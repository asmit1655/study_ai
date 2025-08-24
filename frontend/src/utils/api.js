import axios from 'axios';

// Define the base URL for your FastAPI backend.
// It's good practice to use environment variables for this.
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// Create a new Axios instance with a custom configuration.
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * A utility function to set the JWT token in the default headers of the apiClient.
 * This ensures that every subsequent request will be authenticated.
 * @param {string | null} token The JWT token from the login response.
 */
export const setAuthToken = (token) => {
  if (token) {
    // If a token is provided, add it to the Authorization header.
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // If the token is null (e.g., on logout), remove the Authorization header.
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

/**
 * Sends a request to register a new user.
 * @param {object} userData - An object containing user's email and password.
 * @returns {Promise<object>} The response data from the server.
 */
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during user registration:', error.response?.data || error.message);
    throw error; // Re-throw the error to be handled by the calling component.
  }
};

/**
 * Sends a request to log in a user and get an access token.
 * @param {object} credentials - An object containing user's email (as username) and password.
 * @returns {Promise<object>} The response data, including the access_token.
 */
export const login = async (credentials) => {
  try {
    // The backend's OAuth2PasswordRequestForm expects 'x-www-form-urlencoded' data.
    const formData = new URLSearchParams();
    formData.append('username', credentials.email); // Note: FastAPI uses 'username' for the email field here.
    formData.append('password', credentials.password);

    const response = await apiClient.post('/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error during user login:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Sends a request to the AI to generate study content (quiz or flashcards).
 * This is a protected route and requires a valid token to be set.
 * @param {object} contentData - An object containing the 'topic' and 'content_type'.
 * @returns {Promise<object>} The AI-generated content.
 */
export const generateContent = async (contentData) => {
    try {
        const response = await apiClient.post('/ai/generate-content', contentData);
        return response.data;
    } catch (error) {
        console.error('Error generating AI content:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Sends a message to the AI assistant for a chat response.
 * This is a protected route.
 * @param {object} chatData - An object containing the user's 'message'.
 * @returns {Promise<object>} The AI's chat response.
 */
export const chatWithAssistant = async (chatData) => {
    try {
        const response = await apiClient.post('/ai/chat', chatData);
        return response.data;
    } catch (error) {
        console.error('Error chatting with assistant:', error.response?.data || error.message);
        throw error;
    }
};