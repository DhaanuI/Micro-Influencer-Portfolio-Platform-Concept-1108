import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SocialEmbed from '../common/SocialEmbed';
import { useAuth } from '../context/AuthContext';
import { useInfluencer, useAdvertisement } from '../hooks/useAPI';
import AdvertisementCard from './AdvertisementCard';
import api from '../services/api';

const { FiMessageSquare, FiHeart, FiShare2, FiMoreHorizontal, FiGlobe, FiUsers, FiTrendingUp, FiLoader, FiBriefcase, FiGrid, FiPlus, FiX } = FiIcons;

const InfluencerFeed = () => {
  const { user } = useAuth();
  const { updateProfile, addEmbed } = useInfluencer();
  const { getAllAdvertisements, applyToAdvertisement, getMyApplications } = useAdvertisement();
  const [profile, setProfile] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'opportunities'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [applyingTo, setApplyingTo] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPostEmbed, setNewPostEmbed] = useState('');
  const [newPostPlatform, setNewPostPlatform] = useState('instagram');

  const categories = ['all', 'fashion', 'fitness', 'food', 'travel', 'tech', 'lifestyle', 'beauty', 'gaming', 'b2b', 'business', 'other'];

  // Load influencer's own profile and advertisements
  useEffect(() => {
    const loadData = async () => {
      try {
        // Get profile from auth/me endpoint
        const profileResult = await api.auth.getMe();
        if (profileResult?.user) {
          setProfile(profileResult.user);
        }

        // Load my applications
        const applicationsResult = await getMyApplications.execute();
        if (applicationsResult?.data) {
          setMyApplications(applicationsResult.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Load advertisements when category changes
  useEffect(() => {
    const loadAdvertisements = async () => {
      try {
        const params = { page: 1, limit: 20, status: 'active' };
        if (selectedCategory !== 'all') {
          params.category = selectedCategory;
        }
        const result = await getAllAdvertisements.execute(params);
        if (result?.data) {
          setAdvertisements(result.data);
        }
      } catch (error) {
        console.error('Error loading advertisements:', error);
      }
    };

    loadAdvertisements();
  }, [selectedCategory]);

  const handleApply = async (adId) => {
    try {
      setApplyingTo(adId);
      const result = await applyToAdvertisement.execute(adId);
      if (result?.success) {
        // Refresh applications
        const applicationsResult = await getMyApplications.execute();
        if (applicationsResult?.data) {
          setMyApplications(applicationsResult.data);
        }
        alert('Application submitted successfully!');
      }
    } catch (error) {
      alert(error.message || 'Failed to apply. You may have already applied or reached your application limit.');
    } finally {
      setApplyingTo(null);
    }
  };

  const hasApplied = (adId) => {
    return myApplications.some(app => app.advertisementId?._id === adId);
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPostEmbed.trim()) return;

    try {
      // Add embed using the new API
      await addEmbed.execute({
        platform: newPostPlatform,
        embedLink: newPostEmbed
      });

      // Refresh profile
      const profileResult = await api.auth.getMe();
      if (profileResult?.user) {
        setProfile(profileResult.user);
      }

      setNewPostEmbed('');
      setShowAddPost(false);
      alert('Post added successfully!');
    } catch (error) {
      alert('Failed to add post: ' + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
      <div className="glass-panel rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Influencer Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your profile and discover opportunities</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            activeTab === 'profile'
              ? 'bg-purple-600 text-white'
              : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiGrid} className="w-5 h-5" />
            <span>My Profile & Posts</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            activeTab === 'opportunities'
              ? 'bg-purple-600 text-white'
              : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiBriefcase} className="w-5 h-5" />
            <span>Opportunities ({advertisements.length})</span>
          </div>
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && profile && (
        <div>
          {/* My Posts Section */}
          <div className="glass-panel p-6 rounded-2xl mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">My Posts</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Showcase your best content</p>
              </div>
              <button
                onClick={() => setShowAddPost(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Add Post</span>
              </button>
            </div>

            {/* Add Post Modal */}
            {showAddPost && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-slate-900 dark:text-white">Add New Post</h3>
                  <button
                    onClick={() => setShowAddPost(false)}
                    className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleAddPost}>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Platform
                    </label>
                    <select
                      value={newPostPlatform}
                      onChange={(e) => setNewPostPlatform(e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="youtube">YouTube</option>
                    </select>
                  </div>
                  <textarea
                    value={newPostEmbed}
                    onChange={(e) => setNewPostEmbed(e.target.value)}
                    placeholder="Paste embed code here..."
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white mb-3"
                    rows="4"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={addEmbed.loading}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50"
                    >
                      {addEmbed.loading ? 'Adding...' : 'Add Post'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddPost(false)}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Posts Grid */}
            {profile.instagramEmbedLinks?.length > 0 || profile.linkedinEmbedLinks?.length > 0 || profile.youtubeEmbedLinks?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Instagram Posts */}
                {profile.instagramEmbedLinks?.map((embed, index) => (
                  <motion.div
                    key={`instagram-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
                  >
                    <SocialEmbed html={embed} type="instagram" title={`Post ${index + 1}`} />
                  </motion.div>
                ))}
                {/* LinkedIn Posts */}
                {profile.linkedinEmbedLinks?.map((embed, index) => (
                  <motion.div
                    key={`linkedin-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
                  >
                    <SocialEmbed html={embed} type="linkedin" title={`Post ${index + 1}`} />
                  </motion.div>
                ))}
                {/* YouTube Posts */}
                {profile.youtubeEmbedLinks?.map((embed, index) => (
                  <motion.div
                    key={`youtube-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
                  >
                    <SocialEmbed html={embed} type="youtube" title={`Post ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <SafeIcon icon={FiGrid} className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">No posts yet. Add your first post to showcase your content!</p>
                <button
                  onClick={() => setShowAddPost(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                >
                  Add Your First Post
                </button>
              </div>
            )}
          </div>

          {/* Quick Link to Full Dashboard */}
          <Link to="/dashboard/influencer">
            <button className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold">
              Go to Full Dashboard
            </button>
          </Link>
        </div>
      )}

      {/* Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <div>
          {/* Header with Stats */}
          <div className="glass-panel p-6 rounded-2xl mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Available Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiBriefcase} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Opportunities</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {advertisements.length}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiHeart} className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">My Applications</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {myApplications.length}
                </p>
              </div>

            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-semibold capitalize whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Advertisements Grid */}
          {getAllAdvertisements.loading ? (
            <div className="flex justify-center items-center py-20">
              <SafeIcon icon={FiLoader} className="w-8 h-8 text-purple-600 animate-spin" />
              <span className="ml-3 text-lg text-slate-600 dark:text-slate-300">Loading opportunities...</span>
            </div>
          ) : advertisements.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-2xl">
              <SafeIcon icon={FiBriefcase} className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No opportunities available in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advertisements.map((ad) => (
                <AdvertisementCard
                  key={ad._id}
                  advertisement={ad}
                  onApply={handleApply}
                  showApplyButton={true}
                  hasApplied={hasApplied(ad._id)}
                  isLoading={applyingTo === ad._id}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfluencerFeed;