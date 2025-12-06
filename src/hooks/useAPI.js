import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Custom hook for making API calls with loading and error states
 * @param {Function} apiFunction - The API function to call
 * @returns {Object} - { data, loading, error, execute, reset }
 */
export const useAPI = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
};

/**
 * Hook for authentication operations
 */
export const useAuth = () => {
  const signup = useAPI(api.auth.signup);
  const login = useAPI(api.auth.login);
  const getMe = useAPI(api.auth.getMe);

  return {
    signup,
    login,
    getMe,
  };
};

/**
 * Hook for influencer operations
 */
export const useInfluencer = () => {
  const createOrUpdateProfile = useAPI(api.influencer.createOrUpdateProfile);
  const updateEmbedLinks = useAPI(api.influencer.updateEmbedLinks);
  const getMyProfile = useAPI(api.influencer.getMyProfile);
  const getProfileInterests = useAPI(api.influencer.getProfileInterests);
  const getAllInfluencers = useAPI(api.influencer.getAllInfluencers);
  const getInfluencerById = useAPI(api.influencer.getInfluencerById);
  const getInfluencerEmbeds = useAPI(api.influencer.getInfluencerEmbeds);

  return {
    createOrUpdateProfile,
    updateEmbedLinks,
    getMyProfile,
    getProfileInterests,
    getAllInfluencers,
    getInfluencerById,
    getInfluencerEmbeds,
  };
};

/**
 * Hook for startup operations
 */
export const useStartup = () => {
  const viewInfluencerProfile = useAPI(api.startup.viewInfluencerProfile);
  const markInterest = useAPI(api.startup.markInterest);
  const getMyInterests = useAPI(api.startup.getMyInterests);

  return {
    viewInfluencerProfile,
    markInterest,
    getMyInterests,
  };
};

export default {
  useAPI,
  useAuth,
  useInfluencer,
  useStartup,
};

