import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';
import { useInfluencer } from '../hooks/useAPI';
import SocialEmbed from '../common/SocialEmbed';

const {
  FiArrowLeft, FiUsers, FiTrendingUp, FiInstagram, FiYoutube, FiTwitter,
  FiLock, FiUnlock, FiStar, FiEye, FiHeart, FiMessageCircle,
  FiMapPin, FiGlobe, FiMail, FiPhone, FiLoader
} = FiIcons;

const InfluencerProfile = () => {
  const { id } = useParams();
  const { user, openAuthModal } = useAuth();
  const { getAllInfluencers } = useInfluencer();
  const [hasUnlockedContact, setHasUnlockedContact] = useState(false);
  const [influencerData, setInfluencerData] = useState(null);
  const [embeds, setEmbeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markInterest, setMarkInterest] = useState({ loading: false, error: null });

  // Fetch influencer data from backend
  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get all influencers and filter by ID
        const result = await getAllInfluencers.execute();

        if (result?.data) {
          const influencer = result.data.find(inf => inf._id === id);

          if (influencer) {
            setInfluencerData(influencer);

            // Extract embeds from the influencer data
            const allEmbeds = [];

            // Add Instagram embeds
            if (influencer.instagramEmbedLinks && influencer.instagramEmbedLinks.length > 0) {
              influencer.instagramEmbedLinks.forEach((embedCode, index) => {
                allEmbeds.push({
                  _id: `instagram-${index}`,
                  platform: 'instagram',
                  embedCode: embedCode
                });
              });
            }

            // Add LinkedIn embeds
            if (influencer.linkedinEmbedLinks && influencer.linkedinEmbedLinks.length > 0) {
              influencer.linkedinEmbedLinks.forEach((embedCode, index) => {
                allEmbeds.push({
                  _id: `linkedin-${index}`,
                  platform: 'linkedin',
                  embedCode: embedCode
                });
              });
            }

            // Add YouTube embeds
            if (influencer.youtubeEmbedLinks && influencer.youtubeEmbedLinks.length > 0) {
              influencer.youtubeEmbedLinks.forEach((embedCode, index) => {
                allEmbeds.push({
                  _id: `youtube-${index}`,
                  platform: 'youtube',
                  embedCode: embedCode
                });
              });
            }

            setEmbeds(allEmbeds);
          } else {
            setError('Influencer not found');
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load influencer profile');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInfluencer();
    }
  }, [id]);

  const handleMarkInterest = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    setMarkInterest({ loading: true, error: null });

    try {
      // TODO: Implement actual API call when backend endpoint is ready
      // await api.startup.markInterest(id, 'Interested in collaboration');

      // For now, show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Interest marked successfully! This feature will be fully functional once the backend endpoint is implemented.');
      setMarkInterest({ loading: false, error: null });
    } catch (err) {
      setMarkInterest({ loading: false, error: err.message });
      alert('Failed to mark interest: ' + err.message);
    }
  };

  // Use backend data or fallback to mock data
  const influencer = influencerData || {
    id: 1,
    name: 'Loading...',
    category: 'lifestyle',
    followers: 0,
    engagement: 0,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop',
    platforms: ['instagram'],
    verified: false,
    bio: '',
    location: '',
    languages: [],
    pricing: {},
    stats: {},
    recentPosts: [],
    testimonials: []
  };

  // Transform backend data to match component structure
  const displayData = {
    id: influencer._id || influencer.id,
    name: influencer.userId?.name || influencer.name || 'Unknown',
    category: influencer.category || 'General',
    followers: influencer.followersCount || 0,
    engagement: influencer.engagementRate || 0,
    image: influencer.profileImage || influencer.image || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    coverImage: influencer.coverImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop',
    platforms: influencer.platforms || ['instagram'],
    verified: influencer.isProfileComplete || false,
    bio: influencer.bio || 'No bio available',
    location: influencer.location || 'Not specified',
    languages: influencer.languages || [],
    pricing: influencer.pricing || {},
    stats: influencer.stats || {},
    email: influencer.userId?.email || influencer.email,
    phone: influencer.phone,
    website: influencer.website,
    instagramHandle: influencer.instagramHandle,
    linkedinHandle: influencer.linkedinHandle
  };

  const handleUnlockContact = () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    // In real app, this would process payment
    setHasUnlockedContact(true);
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return FiInstagram;
      case 'youtube': return FiYoutube;
      case 'twitter': return FiTwitter;
      default: return FiUsers;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <SafeIcon icon={FiLoader} className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-slate-600 dark:text-slate-300">Loading influencer profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 dark:text-red-400 mb-4 text-lg">{error}</p>
          <Link to="/discover">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
              Back to Discover
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
        <img
          src={displayData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute top-4 left-4">
          <Link to="/discover">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Back</span>
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={displayData.image}
                    alt={displayData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700"
                  />
                  {displayData.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {displayData.name}
                  </h1>
                  <p className="text-purple-600 dark:text-purple-400 capitalize font-medium mb-2">
                    {displayData.category} Influencer
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {displayData.bio}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
                    {displayData.location && (
                      <span className="flex items-center space-x-1">
                        <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                        <span>{displayData.location}</span>
                      </span>
                    )}
                    {displayData.languages && displayData.languages.length > 0 && (
                      <span className="flex items-center space-x-1">
                        <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                        <span>{displayData.languages.join(', ')}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-purple-600 dark:text-purple-400 mb-1">
                    <SafeIcon icon={FiUsers} className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {displayData.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-green-500 mb-1">
                    <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {displayData.engagement}%
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-blue-500 mb-1">
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {displayData.stats?.avgViews?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Avg Views</div>
                </div>
              </div>
            </motion.div>

            {/* Social Media Embeds */}
            {embeds && embeds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Portfolio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {embeds.map((embed) => (
                    <div key={embed._id} className="rounded-xl overflow-hidden h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                      <SocialEmbed
                        type={embed.platform}
                        html={embed.embedCode}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recent Posts - Fallback if no embeds */}
            {(!embeds || embeds.length === 0) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Portfolio</h3>
                <p className="text-slate-600 dark:text-slate-400 text-center py-8">
                  No portfolio items available yet.
                </p>
              </motion.div>
            )}

            {/* Testimonials - Hidden for now */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons for Startups */}
            {user?.userType === 'startup' && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Actions</h3>
                <button
                  onClick={handleMarkInterest}
                  disabled={markInterest.loading}
                  className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {markInterest.loading ? 'Marking Interest...' : 'Mark Interest'}
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                  Let this influencer know you're interested in collaboration
                </p>
              </motion.div>
            )}

            {/* Pricing */}
            {displayData.pricing && Object.keys(displayData.pricing).length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Pricing</h3>
                <div className="space-y-3">
                  {displayData.pricing.post && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Instagram Post</span>
                      <span className="font-semibold text-slate-900 dark:text-white">${displayData.pricing.post}</span>
                    </div>
                  )}
                  {displayData.pricing.story && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Instagram Story</span>
                      <span className="font-semibold text-slate-900 dark:text-white">${displayData.pricing.story}</span>
                    </div>
                  )}
                  {displayData.pricing.reel && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Instagram Reel</span>
                      <span className="font-semibold text-slate-900 dark:text-white">${displayData.pricing.reel}</span>
                    </div>
                  )}
                  {displayData.pricing.video && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">YouTube Video</span>
                      <span className="font-semibold text-slate-900 dark:text-white">${displayData.pricing.video}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Contact & Social</h3>
              <div className="space-y-3">
                {displayData.instagramHandle && (
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiInstagram} className="w-5 h-5 text-pink-500" />
                    <a
                      href={`https://instagram.com/${displayData.instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      @{displayData.instagramHandle}
                    </a>
                  </div>
                )}
                {displayData.linkedinHandle && (
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiGlobe} className="w-5 h-5 text-blue-500" />
                    <a
                      href={`https://linkedin.com/in/${displayData.linkedinHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {displayData.email && user?.userType === 'startup' && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-green-800 dark:text-green-400">
                      <SafeIcon icon={FiMail} className="w-4 h-4" />
                      <a href={`mailto:${displayData.email}`} className="hover:underline">
                        {displayData.email}
                      </a>
                    </div>
                  </div>
                )}
                {displayData.phone && user?.userType === 'startup' && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-green-800 dark:text-green-400">
                      <SafeIcon icon={FiPhone} className="w-4 h-4" />
                      <a href={`tel:${displayData.phone}`} className="hover:underline">
                        {displayData.phone}
                      </a>
                    </div>
                  </div>
                )}
                {displayData.website && (
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiGlobe} className="w-5 h-5 text-purple-500" />
                    <a
                      href={displayData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 truncate"
                    >
                      {displayData.website}
                    </a>
                  </div>
                )}
                {!displayData.instagramHandle && !displayData.linkedinHandle && !displayData.email && !displayData.website && (
                  <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                    No contact information available
                  </p>
                )}
              </div>
            </motion.div>

            {/* Platforms */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Active Platforms</h3>
              <div className="flex space-x-3">
                {displayData.platforms.map(platform => (
                  <div key={platform} className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    <SafeIcon icon={getPlatformIcon(platform)} className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerProfile;