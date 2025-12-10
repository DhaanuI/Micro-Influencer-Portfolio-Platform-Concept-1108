import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { saveAuthToken, saveUserData } from '../utils/apiHelpers';

const { FiX, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiInstagram, FiYoutube, FiGlobe, FiMapPin, FiBriefcase, FiLinkedin, FiTwitter, FiAlertCircle } = FiIcons;

const AuthModal = () => {
  const { isAuthModalOpen, authMode, closeAuthModal, setAuthMode, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'startup',
    // Influencer Specific
    instagram: '',
    youtube: '',
    tiktok: '',
    // Startup Specific
    companyName: '',
    website: '',
    location: '',
    companySize: '',
    linkedin: '',
    twitter: ''
  });

  // Reset error when auth mode changes
  useEffect(() => {
    setError('');
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
  }, [authMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authMode === 'signup') {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }

        // Prepare signup data
        const signupData = {
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          name: formData.name || 'User'
        };

        // Add company name for startups
        if (formData.userType === 'startup' && formData.companyName) {
          signupData.companyName = formData.companyName;
        }

        // Call signup API
        const result = await api.auth.signup(signupData);

        // Save token and user data
        saveAuthToken(result.token);
        saveUserData(result.user);

        // Update auth context
        login(result.user);

      } else {
        // Login
        const result = await api.auth.login({
          email: formData.email,
          password: formData.password
        });

        // Save token and user data
        saveAuthToken(result.token);
        saveUserData(result.user);

        // Update auth context
        login(result.user);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={closeAuthModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-panel bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/20 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Join Influence Hub'}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeAuthModal}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </motion.button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-300 text-sm font-medium"
              >
                <SafeIcon icon={FiAlertCircle} className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <label className="relative cursor-pointer">
                      <input 
                        type="radio" 
                        name="userType" 
                        value="startup" 
                        checked={formData.userType === 'startup'} 
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-3 border rounded-xl text-center transition-all ${formData.userType === 'startup' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                        <div className="font-medium">Startup / Brand</div>
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input 
                        type="radio" 
                        name="userType" 
                        value="influencer" 
                        checked={formData.userType === 'influencer'} 
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-3 border rounded-xl text-center transition-all ${formData.userType === 'influencer' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                        <div className="font-medium">Influencer</div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {authMode === 'signup' && formData.userType === 'influencer' && (
                <div className="space-y-4 pt-2">
                   <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Social Media (Optional - can be added later)</p>
                   <div className="relative">
                    <SafeIcon icon={FiInstagram} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 w-5 h-5" />
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                      placeholder="Instagram Handle (e.g. @username) - Optional"
                    />
                  </div>
                  <div className="relative">
                    <SafeIcon icon={FiYoutube} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    <input
                      type="text"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleInputChange}
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                      placeholder="YouTube Channel URL - Optional"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <SafeIcon icon={FiLinkedin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700 w-5 h-5" />
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                        placeholder="LinkedIn URL - Optional"
                      />
                    </div>
                    <div className="relative">
                      <SafeIcon icon={FiTwitter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 w-5 h-5" />
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                        placeholder="Twitter/X Handle"
                      />
                    </div>
                  </div>
                </div>
              )}

              {authMode === 'signup' && formData.userType === 'startup' && (
                <div className="space-y-4 pt-2">
                  <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Company Details (Optional - can be added later)</p>
                  <div className="relative">
                    <SafeIcon icon={FiBriefcase} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                      placeholder="Company Name - Optional"
                    />
                  </div>
                  <div className="relative">
                    <SafeIcon icon={FiGlobe} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                      placeholder="Company Website (https://...) - Optional"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <SafeIcon icon={FiLinkedin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700 w-5 h-5" />
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                        placeholder="LinkedIn URL"
                      />
                    </div>
                    <div className="relative">
                      <SafeIcon icon={FiTwitter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 w-5 h-5" />
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        className="glass-input w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                        placeholder="Twitter/X Handle"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="relative">
                      <SafeIcon icon={FiMapPin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="glass-input w-full pl-9 pr-4 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                        placeholder="HQ Location - Optional"
                      />
                    </div>
                    <div className="relative">
                      <SafeIcon icon={FiBriefcase} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <select
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleInputChange}
                        className="glass-input w-full pl-9 pr-4 py-3 rounded-xl focus:outline-none text-slate-900 dark:text-white"
                      >
                        <option value="" className="dark:bg-slate-800">Company Size - Optional</option>
                        <option value="1-10" className="dark:bg-slate-800">1-10</option>
                        <option value="11-50" className="dark:bg-slate-800">11-50</option>
                        <option value="50+" className="dark:bg-slate-800">50+</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="glass-input w-full pl-10 pr-12 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {authMode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="glass-input w-full pl-10 pr-12 py-3 rounded-xl focus:outline-none placeholder-slate-400"
                      placeholder="Re-enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all font-semibold text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (authMode === 'login' ? 'Log In' : 'Create Account')}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                >
                  {authMode === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;