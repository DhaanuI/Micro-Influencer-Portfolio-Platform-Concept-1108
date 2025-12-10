import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SocialEmbed from '../common/SocialEmbed';
import { useInfluencer, useAdvertisement } from '../hooks/useAPI';

const { FiCheckCircle, FiPlay, FiSearch, FiFilter, FiUserCheck, FiBarChart, FiLock, FiUnlock, FiEye, FiTrendingUp, FiLoader, FiGrid, FiBriefcase, FiDollarSign, FiClock, FiEdit, FiTrash2 } = FiIcons;

const StartupFeed = () => {
  const [activeTab, setActiveTab] = useState('content'); // 'content' or 'dashboard'
  const [activeCategory, setActiveCategory] = useState('All');
  const [influencers, setInfluencers] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const { getAllInfluencers } = useInfluencer();
  const { getMyAdvertisements } = useAdvertisement();

  const categories = ['All', 'lifestyle', 'tech', 'fashion', 'fitness', 'food', 'travel', 'beauty'];

  // Load influencers from backend
  useEffect(() => {
    const loadInfluencers = async () => {
      try {
        const params = {
          page: 1,
          limit: 20
        };

        if (activeCategory !== 'All') {
          params.category = activeCategory;
        }

        const result = await getAllInfluencers.execute(params);
        if (result?.data) {
          setInfluencers(result.data);
        }
      } catch (error) {
        console.error('Error loading influencers:', error);
      }
    };

    loadInfluencers();
  }, [activeCategory]);

  // Load startup's own advertisements
  useEffect(() => {
    const loadAdvertisements = async () => {
      try {
        const result = await getMyAdvertisements.execute({ page: 1, limit: 50 });
        if (result?.data) {
          setAdvertisements(result.data);
        }
      } catch (error) {
        console.error('Error loading advertisements:', error);
      }
    };

    loadAdvertisements();
  }, []);



  // Separate active and inactive advertisements
  const activeAds = advertisements.filter(ad => ad.status === 'active');
  const inactiveAds = advertisements.filter(ad => ad.status !== 'active');

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Hero Header */}
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Startup Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Discover influencer content and manage your advertisements
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              activeTab === 'content'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiGrid} className="w-5 h-5" />
              <span>Influencer Content</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiBriefcase} className="w-5 h-5" />
              <span>My Advertisements ({advertisements.length})</span>
            </div>
          </button>
        </div>

        {/* Content Tab - Influencer Content */}
        {activeTab === 'content' && (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all capitalize ${
                      activeCategory === cat
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {getAllInfluencers.loading && (
              <div className="flex justify-center items-center py-20">
                <SafeIcon icon={FiLoader} className="w-8 h-8 text-purple-600 animate-spin" />
                <span className="ml-3 text-lg text-slate-600 dark:text-slate-300">Loading influencers...</span>
              </div>
            )}

            {/* Error State */}
            {getAllInfluencers.error && (
              <div className="text-center py-20">
                <p className="text-red-600 dark:text-red-400 mb-4">Error: {getAllInfluencers.error}</p>
              </div>
            )}

            {/* Influencer Content Grid */}
            {!getAllInfluencers.loading && !getAllInfluencers.error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {influencers.map((influencer) => {
                    const userName = influencer.userId?.name || influencer.name || 'Unknown';
                    const userImage = influencer.profileImage || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face';

                    // Collect all embeds from all platforms
                    const allEmbeds = [];

                    // Add Instagram embeds
                    if (influencer.instagramEmbedLinks?.length > 0) {
                      influencer.instagramEmbedLinks.forEach(embed => {
                        allEmbeds.push({ html: embed, type: 'instagram' });
                      });
                    }

                    // Add LinkedIn embeds
                    if (influencer.linkedinEmbedLinks?.length > 0) {
                      influencer.linkedinEmbedLinks.forEach(embed => {
                        allEmbeds.push({ html: embed, type: 'linkedin' });
                      });
                    }

                    // Add YouTube embeds
                    if (influencer.youtubeEmbedLinks?.length > 0) {
                      influencer.youtubeEmbedLinks.forEach(embed => {
                        allEmbeds.push({ html: embed, type: 'youtube' });
                      });
                    }

                    // Render each embed as a separate card
                    return allEmbeds.length > 0 ? (
                      allEmbeds.map((embedData, index) => (
                        <motion.div
                          key={`${influencer._id}-${embedData.type}-${index}`}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                        >
                          {/* Embedded Content */}
                          <div className="relative hide-creator-name">
                            <SocialEmbed
                              html={embedData.html}
                              type={embedData.type}
                              title="Content Creator's post"
                              hideUsername={true}
                            />
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-white uppercase tracking-wider capitalize">
                            {influencer.category || 'General'}
                          </div>

                          {/* Platform Badge */}
                          <div className="absolute top-3 right-3 px-2 py-1 bg-indigo-600 backdrop-blur-md rounded text-xs font-bold text-white uppercase tracking-wider">
                            {embedData.type}
                          </div>

                          {/* Content Info */}
                          <div className="p-5">
                            {/* Creator name hidden for privacy */}
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                Content Creator
                              </h3>
                            </div>

                            {influencer.bio && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                                {influencer.bio}
                              </p>
                            )}

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-2 py-3 border-t border-slate-100 dark:border-slate-800">
                              <div className="text-center">
                                <div className="text-xs text-slate-400 uppercase font-semibold">Followers</div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">
                                  {(influencer.followersCount || 0).toLocaleString()}
                                </div>
                              </div>
                              <div className="text-center border-l border-slate-100 dark:border-slate-800">
                                <div className="text-xs text-slate-400 uppercase font-semibold">Total Posts</div>
                                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                  {allEmbeds.length}
                                </div>
                              </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                              <Link to={`/influencer/${influencer._id}`}>
                                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                                  <span>View Full Profile</span>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      // If no embeds, show profile card with image
                      <motion.div
                        key={influencer._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={userImage}
                            alt={userName}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-white uppercase tracking-wider capitalize">
                          {influencer.category || 'General'}
                        </div>

                        {/* Content Info */}
                        <div className="p-5">
                          {/* Creator name hidden for privacy */}
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                              Content Creator
                            </h3>
                          </div>

                          {influencer.bio && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                              {influencer.bio}
                            </p>
                          )}

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-2 gap-2 py-3 border-t border-slate-100 dark:border-slate-800">
                            <div className="text-center">
                              <div className="text-xs text-slate-400 uppercase font-semibold">Followers</div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">
                                {(influencer.followersCount || 0).toLocaleString()}
                              </div>
                            </div>
                            <div className="text-center border-l border-slate-100 dark:border-slate-800">
                              <div className="text-xs text-slate-400 uppercase font-semibold">Posts</div>
                              <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                0
                              </div>
                            </div>
                          </div>

                          {/* Footer Actions */}
                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <Link to={`/influencer/${influencer._id}`}>
                              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                                <SafeIcon icon={FiEye} className="w-4 h-4" />
                                <span>View Full Profile</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Empty State */}
            {!getAllInfluencers.loading && !getAllInfluencers.error && influencers.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg text-slate-600 dark:text-slate-300">No influencers found in this category.</p>
              </div>
            )}
          </>
        )}

        {/* Dashboard Tab - My Advertisements */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Dashboard Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Advertisements</h2>
                <p className="text-slate-600 dark:text-slate-400">Manage your active and previous campaigns</p>
              </div>
              <Link to="/dashboard/startup">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center space-x-2">
                  <SafeIcon icon={FiEdit} className="w-5 h-5" />
                  <span>Create New Ad</span>
                </button>
              </Link>
            </div>

            {/* Loading State */}
            {getMyAdvertisements.loading && (
              <div className="flex justify-center items-center py-20">
                <SafeIcon icon={FiLoader} className="w-8 h-8 text-indigo-600 animate-spin" />
                <span className="ml-3 text-lg text-slate-600 dark:text-slate-300">Loading advertisements...</span>
              </div>
            )}

            {/* Active Advertisements */}
            {!getMyAdvertisements.loading && activeAds.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <SafeIcon icon={FiTrendingUp} className="w-6 h-6 mr-2 text-green-600" />
                  Active Campaigns ({activeAds.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeAds.map((ad) => (
                    <motion.div
                      key={ad._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Advertisement Image */}
                      {ad.image && (
                        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                            Active
                          </div>
                        </div>
                      )}

                      {/* Advertisement Details */}
                      <div className="p-5">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                          {ad.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {ad.description}
                        </p>

                        {/* Budget and Category */}
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                          {ad.budget && (
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {ad.budget}
                              </span>
                            </div>
                          )}
                          {ad.category && (
                            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded text-xs font-semibold capitalize">
                              {ad.category}
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Applications</div>
                            <div className="text-lg font-bold text-slate-900 dark:text-white">
                              {ad.totalApplications || 0}
                            </div>
                          </div>
                          <div className="text-center bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Created</div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">
                              {new Date(ad.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <Link to="/dashboard/startup">
                          <button className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors">
                            View Applications
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Previous/Inactive Advertisements */}
            {!getMyAdvertisements.loading && inactiveAds.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <SafeIcon icon={FiClock} className="w-6 h-6 mr-2 text-slate-500" />
                  Previous Campaigns ({inactiveAds.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inactiveAds.map((ad) => (
                    <motion.div
                      key={ad._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm opacity-75 hover:opacity-100 transition-all duration-300"
                    >
                      {/* Advertisement Image */}
                      {ad.image && (
                        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-full h-full object-cover grayscale"
                          />
                          <div className="absolute top-3 right-3 px-3 py-1 bg-slate-500 text-white rounded-full text-xs font-bold capitalize">
                            {ad.status}
                          </div>
                        </div>
                      )}

                      {/* Advertisement Details */}
                      <div className="p-5">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                          {ad.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {ad.description}
                        </p>

                        {/* Budget and Category */}
                        <div className="flex items-center justify-between mb-4">
                          {ad.budget && (
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-slate-500" />
                              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                                {ad.budget}
                              </span>
                            </div>
                          )}
                          {ad.category && (
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-semibold capitalize">
                              {ad.category}
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="text-center bg-slate-50 dark:bg-slate-800 rounded-lg p-2 mb-3">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Total Applications</div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {ad.totalApplications || 0}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!getMyAdvertisements.loading && advertisements.length === 0 && (
              <div className="text-center py-20 glass-panel rounded-2xl">
                <SafeIcon icon={FiBriefcase} className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Advertisements Yet</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Create your first advertisement to start connecting with influencers
                </p>
                <Link to="/dashboard/startup">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
                    Create Advertisement
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default StartupFeed;