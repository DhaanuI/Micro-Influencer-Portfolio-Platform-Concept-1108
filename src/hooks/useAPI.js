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
  const updateProfile = useAPI(api.influencer.updateProfile);
  const addEmbed = useAPI(api.influencer.addEmbed);
  const getAllInfluencers = useAPI(api.influencer.getAllInfluencers);

  return {
    updateProfile,
    addEmbed,
    getAllInfluencers,
  };
};

/**
 * Hook for advertisement operations
 */
export const useAdvertisement = () => {
  const createAdvertisement = useAPI(api.advertisement.createAdvertisement);
  const getAllAdvertisements = useAPI(api.advertisement.getAllAdvertisements);
  const getAdvertisementById = useAPI(api.advertisement.getAdvertisementById);
  const getMyAdvertisements = useAPI(api.advertisement.getMyAdvertisements);
  const updateAdvertisement = useAPI(api.advertisement.updateAdvertisement);
  const deleteAdvertisement = useAPI(api.advertisement.deleteAdvertisement);
  const applyToAdvertisement = useAPI(api.advertisement.applyToAdvertisement);
  const getAdvertisementApplications = useAPI(api.advertisement.getAdvertisementApplications);
  const getMyApplications = useAPI(api.advertisement.getMyApplications);
  const updateApplicationStatus = useAPI(api.advertisement.updateApplicationStatus);

  return {
    createAdvertisement,
    getAllAdvertisements,
    getAdvertisementById,
    getMyAdvertisements,
    updateAdvertisement,
    deleteAdvertisement,
    applyToAdvertisement,
    getAdvertisementApplications,
    getMyApplications,
    updateApplicationStatus,
  };
};

export default {
  useAPI,
  useAuth,
  useInfluencer,
  useAdvertisement,
};

