import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useInfluencer } from '../hooks/useAPI';

const { FiSearch, FiFilter, FiInstagram, FiYoutube, FiTwitter, FiUsers, FiTrendingUp, FiLoader } = FiIcons;

const InfluencerGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { getAllInfluencers } = useInfluencer();
  const [influencers, setInfluencers] = useState([]);

  const categories = [
    'all', 'lifestyle', 'tech', 'fashion', 'fitness', 'food', 'travel', 'beauty'
  ];

  // Load influencers from backend
  useEffect(() => {
    const loadInfluencers = async () => {
      try {
        const params = {
          page: 1,
          limit: 50
        };

        if (selectedCategory !== 'all') {
          params.category = selectedCategory;
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
  }, [selectedCategory]);

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return FiInstagram;
      case 'youtube': return FiYoutube;
      case 'twitter': return FiTwitter;
      default: return FiUsers;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 drop-shadow-sm">
          Discover Top Influencers
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-200 max-w-2xl mx-auto">
          Browse through our curated list of micro-influencers and find the perfect match for your brand
        </p>
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
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading influencers: {getAllInfluencers.error}</p>
          <button
            onClick={() => getAllInfluencers.execute({ page: 1, limit: 50 })}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search influencers by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 shadow-md transition-all"
          />
        </div>
        <div className="flex items-center space-x-2 relative">
          <SafeIcon icon={FiFilter} className="absolute left-4 z-10 text-slate-400 dark:text-slate-300 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-12 pr-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-white shadow-md appearance-none cursor-pointer min-w-[200px]"
          >
            {categories.map(category => (
              <option key={category} value={category} className="dark:bg-slate-800">
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Influencer Grid */}
      {!getAllInfluencers.loading && !getAllInfluencers.error && (
        <>
          {filteredInfluencers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-slate-600 dark:text-slate-300">No influencers found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInfluencers.map((influencer, index) => {
                // Get user info from populated userId field
                const userName = influencer.userId?.name || influencer.name || 'Unknown';
                const userImage = influencer.profileImage || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face';

                return (
                  <motion.div
                    key={influencer._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/influencer/${influencer._id}`}>
                      <div className="glass-panel rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group-hover:-translate-y-1 border border-white/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/90">
                        <div className="flex items-start space-x-4 mb-5">
                          <div className="relative">
                            <img
                              src={userImage}
                              alt={userName}
                              className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm"
                            />
                            {influencer.isProfileComplete && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 pt-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                              {userName}
                            </h3>
                            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 text-xs font-semibold capitalize mt-1">
                              {influencer.category || 'General'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiUsers} className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {(influencer.followersCount || 0).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {influencer.engagementRate || '4.2'}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-5">
                          <div className="flex space-x-2">
                            {(influencer.platforms || ['instagram']).map(platform => (
                              <div key={platform} className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                <SafeIcon icon={getPlatformIcon(platform)} className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                              </div>
                            ))}
                          </div>
                          <span className="text-sm font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-lg">
                            {influencer.priceRange || 'Contact'}
                          </span>
                        </div>

                        <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-200 dark:hover:border-purple-700 transition-all text-sm font-bold">
                          View Profile
                        </button>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InfluencerGrid;