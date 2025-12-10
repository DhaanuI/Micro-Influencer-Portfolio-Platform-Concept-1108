// API Base URL - Update this to match your backend server
// const API_BASE_URL = "https://influencers-tau.vercel.app/api"
const API_BASE_URL = "https://influencers-1-cyin.onrender.com/api"

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
  // Update influencer profile (bio, followers, category, etc.)
  updateProfile: async (profileData) => {
    const response = await authFetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  // Add embed link (Instagram or LinkedIn)
  addEmbed: async (embedData) => {
    const response = await authFetch(`${API_BASE_URL}/users/embeds`, {
      method: 'POST',
      body: JSON.stringify(embedData),
    });
    return handleResponse(response);
  },

  // Get all influencers with their embeds (for startups to browse)
  getAllInfluencers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/users/influencers${queryString ? `?${queryString}` : ''}`;
    const response = await authFetch(url);
    return handleResponse(response);
  },
};



// ==================== ADVERTISEMENT APIs ====================

export const advertisementAPI = {
  // Create new advertisement (Startup only)
  createAdvertisement: async (adData) => {
    const response = await authFetch(`${API_BASE_URL}/advertisements`, {
      method: 'POST',
      body: JSON.stringify(adData),
    });
    return handleResponse(response);
  },

  // Get all advertisements with filters and pagination
  getAllAdvertisements: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/advertisements${queryString ? `?${queryString}` : ''}`;
    const response = await authFetch(url);
    return handleResponse(response);
  },

  // Get single advertisement by ID
  getAdvertisementById: async (id) => {
    const response = await authFetch(`${API_BASE_URL}/advertisements/${id}`);
    return handleResponse(response);
  },

  // Get my advertisements (Startup only)
  getMyAdvertisements: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/advertisements/my/posts${queryString ? `?${queryString}` : ''}`;
    const response = await authFetch(url);
    return handleResponse(response);
  },

  // Update advertisement (Startup only)
  updateAdvertisement: async (id, adData) => {
    const response = await authFetch(`${API_BASE_URL}/advertisements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adData),
    });
    return handleResponse(response);
  },

  // Delete advertisement (Startup only)
  deleteAdvertisement: async (id) => {
    const response = await authFetch(`${API_BASE_URL}/advertisements/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Apply to advertisement (Influencer only)
  applyToAdvertisement: async (id) => {
    const response = await authFetch(`${API_BASE_URL}/advertisements/${id}/apply`, {
      method: 'POST',
    });
    return handleResponse(response);
  },

  // Get applications for an advertisement (Startup only)
  getAdvertisementApplications: async (id) => {
    const response = await authFetch(`${API_BASE_URL}/advertisements/${id}/applications`);
    return handleResponse(response);
  },

  // Get my applications (Influencer only)
  getMyApplications: async () => {
    const response = await authFetch(`${API_BASE_URL}/advertisements/my/applications`);
    return handleResponse(response);
  },

  // Update application status (Startup only)
  updateApplicationStatus: async (applicationId, status) => {
    const response = await authFetch(`${API_BASE_URL}/advertisements/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },
};

// ==================== SUBSCRIPTION APIs ====================

export const subscriptionAPI = {
  // Get current subscription info
  getSubscription: async () => {
    const response = await authFetch(`${API_BASE_URL}/subscription`);
    return handleResponse(response);
  },

  // Upgrade to premium
  upgradeToPremium: async () => {
    const response = await authFetch(`${API_BASE_URL}/subscription/upgrade`, {
      method: 'POST',
    });
    return handleResponse(response);
  },

  // Downgrade to free
  downgradeToFree: async () => {
    const response = await authFetch(`${API_BASE_URL}/subscription/downgrade`, {
      method: 'POST',
    });
    return handleResponse(response);
  },

  // Activate promoter boost (influencers only)
  activateBoost: async () => {
    const response = await authFetch(`${API_BASE_URL}/subscription/boost`, {
      method: 'POST',
    });
    return handleResponse(response);
  },
};

// Export default object with all APIs
export default {
  auth: authAPI,
  influencer: influencerAPI,
  advertisement: advertisementAPI,
  subscription: subscriptionAPI,
};

