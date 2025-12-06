/**
 * API Helper Utilities
 * Common functions for working with the API
 */

// ==================== TOKEN MANAGEMENT ====================

/**
 * Save authentication token to localStorage
 * @param {string} token - JWT token
 */
export const saveAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} - JWT token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// ==================== USER DATA MANAGEMENT ====================

/**
 * Save user data to localStorage
 * @param {Object} user - User object
 */
export const saveUserData = (user) => {
  localStorage.setItem('userData', JSON.stringify(user));
};

/**
 * Get user data from localStorage
 * @returns {Object|null} - User object or null
 */
export const getUserData = () => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUserData = () => {
  localStorage.removeItem('userData');
};

/**
 * Clear all auth data (token + user data)
 */
export const clearAuthData = () => {
  removeAuthToken();
  removeUserData();
};

// ==================== CATEGORY HELPERS ====================

/**
 * Available influencer categories
 */
export const CATEGORIES = [
  { value: 'fashion', label: 'Fashion' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'food', label: 'Food' },
  { value: 'travel', label: 'Travel' },
  { value: 'tech', label: 'Tech' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'b2b', label: 'B2B' },
  { value: 'other', label: 'Other' }
];

/**
 * Get category label from value
 * @param {string} value - Category value
 * @returns {string} - Category label
 */
export const getCategoryLabel = (value) => {
  const category = CATEGORIES.find(cat => cat.value === value);
  return category ? category.label : value;
};

// ==================== PLATFORM HELPERS ====================

/**
 * Available platforms
 */
export const PLATFORMS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' }
];

/**
 * Validate Instagram embed URL
 * @param {string} url - Instagram embed URL
 * @returns {boolean}
 */
export const isValidInstagramEmbed = (url) => {
  return url.includes('instagram.com') && url.includes('/embed');
};

/**
 * Validate LinkedIn embed URL
 * @param {string} url - LinkedIn embed URL
 * @returns {boolean}
 */
export const isValidLinkedInEmbed = (url) => {
  return url.includes('linkedin.com/embed');
};

/**
 * Convert Instagram post URL to embed URL
 * @param {string} url - Instagram post URL
 * @returns {string} - Embed URL
 */
export const convertInstagramToEmbed = (url) => {
  if (url.includes('/embed')) return url;
  return url.endsWith('/') ? `${url}embed` : `${url}/embed`;
};

// ==================== FORMATTING HELPERS ====================

/**
 * Format follower count with K/M suffix
 * @param {number} count - Follower count
 * @returns {string} - Formatted count
 */
export const formatFollowerCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ==================== VALIDATION HELPERS ====================

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {Object} - { valid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true, message: 'Password is valid' };
};

// ==================== ERROR HANDLING ====================

/**
 * Extract error message from API error
 * @param {Error} error - Error object
 * @returns {string} - User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * Check if error is authentication error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error.message?.includes('Unauthorized') || 
         error.message?.includes('Invalid token') ||
         error.message?.includes('Token expired');
};

export default {
  // Token management
  saveAuthToken,
  getAuthToken,
  removeAuthToken,
  isAuthenticated,
  
  // User data
  saveUserData,
  getUserData,
  removeUserData,
  clearAuthData,
  
  // Categories
  CATEGORIES,
  getCategoryLabel,
  
  // Platforms
  PLATFORMS,
  isValidInstagramEmbed,
  isValidLinkedInEmbed,
  convertInstagramToEmbed,
  
  // Formatting
  formatFollowerCount,
  formatDate,
  
  // Validation
  isValidEmail,
  validatePassword,
  
  // Error handling
  getErrorMessage,
  isAuthError
};

