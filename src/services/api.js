// API Base URL - Update this to match your backend server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Helper function to make authenticated requests
const authFetch = (url, options = {}) => {
  const token = getAuthToken();
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });
};

// ==================== AUTHENTICATION APIs ====================

export const authAPI = {
  // Signup - Create new user account
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Login - Authenticate user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  // Get current user details
  getMe: async () => {
    const response = await authFetch(`${API_BASE_URL}/auth/me`);
    return handleResponse(response);
  },
};

// ==================== INFLUENCER APIs ====================

export const influencerAPI = {
  // Create or update influencer profile
  createOrUpdateProfile: async (profileData) => {
    const response = await authFetch(`${API_BASE_URL}/influencers/profile`, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  // Update embed links (Instagram or LinkedIn)
  updateEmbedLinks: async (embedData) => {
    const response = await authFetch(`${API_BASE_URL}/influencers/embed-links`, {
      method: 'PUT',
      body: JSON.stringify(embedData),
    });
    return handleResponse(response);
  },

  // Get own influencer profile
  getMyProfile: async () => {
    const response = await authFetch(`${API_BASE_URL}/influencers/me/profile`);
    return handleResponse(response);
  },

  // Get list of startups interested in influencer's profile
  getProfileInterests: async () => {
    const response = await authFetch(`${API_BASE_URL}/influencers/me/interests`);
    return handleResponse(response);
  },

  // Browse all influencers with filters and pagination
  getAllInfluencers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/influencers${queryString ? `?${queryString}` : ''}`;
    const response = await authFetch(url);
    return handleResponse(response);
  },

  // Get influencer by ID (basic info)
  getInfluencerById: async (id) => {
    const response = await authFetch(`${API_BASE_URL}/influencers/${id}`);
    return handleResponse(response);
  },

  // Get influencer's embed posts only
  getInfluencerEmbeds: async (id, platform = null) => {
    const url = platform 
      ? `${API_BASE_URL}/influencers/${id}/embeds?platform=${platform}`
      : `${API_BASE_URL}/influencers/${id}/embeds`;
    const response = await authFetch(url);
    return handleResponse(response);
  },
};

// ==================== STARTUP APIs ====================

export const startupAPI = {
  // View influencer profile (uses 1 view from quota)
  viewInfluencerProfile: async (id) => {
    const response = await authFetch(`${API_BASE_URL}/influencers/view/${id}`);
    return handleResponse(response);
  },

  // Mark interest in an influencer
  markInterest: async (influencerId, note = '') => {
    const response = await authFetch(`${API_BASE_URL}/influencers/interest/${influencerId}`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
    return handleResponse(response);
  },

  // Get list of influencers the startup has marked interest in
  getMyInterests: async () => {
    const response = await authFetch(`${API_BASE_URL}/influencers/my/interests`);
    return handleResponse(response);
  },
};

// Export default object with all APIs
export default {
  auth: authAPI,
  influencer: influencerAPI,
  startup: startupAPI,
};

