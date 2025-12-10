import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SocialEmbed from '../common/SocialEmbed';
import { useAuth } from '../context/AuthContext';
import { useInfluencer, useAdvertisement } from '../hooks/useAPI';

const { FiSearch, FiFilter, FiUsers, FiTrendingUp, FiDollarSign, FiEye, FiHeart, FiStar, FiGrid, FiPlus, FiLink, FiVideo, FiImage, FiTrash2, FiExternalLink, FiSettings, FiLogOut, FiCode, FiBriefcase, FiEdit, FiX } = FiIcons;

const StartupDashboard = () => {
  const { logout } = useAuth();
  const { getAllInfluencers } = useInfluencer();
  const {
    getMyAdvertisements,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
    getAdvertisementApplications
  } = useAdvertisement();

  const [activeTab, setActiveTab] = useState('advertisements');
  const [showAddPost, setShowAddPost] = useState(false);
  const [showCreateAd, setShowCreateAd] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);
  const [selectedAdApplications, setSelectedAdApplications] = useState(null);

  const [filters, setFilters] = useState({
    category: '',
    minFollowers: '',
    page: 1,
    limit: 10
  });

  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    category: 'other',
    budget: '',
    image: ''
  });

  // Load influencers and advertisements on mount
  useEffect(() => {
    getAllInfluencers.execute(filters);
    loadAdvertisements();
  }, [filters]);

  const loadAdvertisements = async () => {
    const result = await getMyAdvertisements.execute();
    if (result?.data) {
      setAdvertisements(result.data);
    }
  };

  // Mock Content Data
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Product Launch Event 2024',
      views: '250K'
    },
    {
      id: 2,
      platform: 'instagram',
      url: 'https://www.instagram.com/p/Cdb12345/',
      title: 'Company Culture Spotlight',
      likes: '1.2K'
    }
  ]);
  const [newPost, setNewPost] = useState({ platform: 'instagram', url: '', title: '' });

  const handleAddPost = (e) => {
    e.preventDefault();
    
    // Check if input is HTML code or URL
    const isHtml = newPost.url.trim().startsWith('<');

    const newItem = {
      id: Date.now(),
      platform: newPost.platform,
      title: newPost.title,
      // Store HTML if provided
      embedHtml: isHtml ? newPost.url : null,
      url: isHtml ? null : newPost.url,
      thumbnail: !isHtml && newPost.platform !== 'youtube' ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop' : null,
      views: '0',
      likes: '0'
    };

    setPortfolioItems([newItem, ...portfolioItems]);
    setNewPost({ platform: 'instagram', url: '', title: '' });
    setShowAddPost(false);
  };

  const handleDeletePost = (id) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
  };

  const handleCreateAd = async (e) => {
    e.preventDefault();
    try {
      const result = await createAdvertisement.execute(newAd);
      if (result?.success) {
        await loadAdvertisements();
        setNewAd({ title: '', description: '', category: 'other', budget: '', image: '' });
        setShowCreateAd(false);
        alert('Advertisement created successfully!');
      }
    } catch (error) {
      alert(error.message || 'Failed to create advertisement');
    }
  };

  const handleUpdateAd = async (e) => {
    e.preventDefault();
    try {
      const result = await updateAdvertisement.execute(editingAd._id, newAd);
      if (result?.success) {
        await loadAdvertisements();
        setEditingAd(null);
        setNewAd({ title: '', description: '', category: 'other', budget: '', image: '' });
        alert('Advertisement updated successfully!');
      }
    } catch (error) {
      alert(error.message || 'Failed to update advertisement');
    }
  };

  const handleDeleteAd = async (id) => {
    if (confirm('Are you sure you want to delete this advertisement?')) {
      try {
        const result = await deleteAdvertisement.execute(id);
        if (result?.success) {
          await loadAdvertisements();
          alert('Advertisement deleted successfully!');
        }
      } catch (error) {
        alert(error.message || 'Failed to delete advertisement');
      }
    }
  };

  const handleViewApplications = async (ad) => {
    try {
      const result = await getAdvertisementApplications.execute(ad._id);
      if (result?.data) {
        setSelectedAdApplications({ ad, applications: result.data });
      }
    } catch (error) {
      alert(error.message || 'Failed to load applications');
    }
  };

  const startEditAd = (ad) => {
    setEditingAd(ad);
    setNewAd({
      title: ad.title,
      description: ad.description,
      category: ad.category,
      budget: ad.budget,
      image: ad.image || ''
    });
  };

  const savedInfluencers = [
    { id: 1, name: 'Sarah Johnson', category: 'lifestyle', followers: 45000, engagement: 4.2, image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face', priceRange: '$500-1000', lastContact: '2024-01-15' },
    { id: 2, name: 'Alex Chen', category: 'tech', followers: 32000, engagement: 5.1, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', priceRange: '$300-700', lastContact: '2024-01-18' }
  ];

  const campaigns = [
    { id: 1, name: 'Summer Product Launch', influencers: 3, budget: '$2,500', status: 'active', startDate: '2024-01-10', endDate: '2024-02-10' },
    { id: 2, name: 'Brand Awareness Campaign', influencers: 5, budget: '$4,200', status: 'completed', startDate: '2023-12-01', endDate: '2024-01-01' }
  ];

  const stats = [
    { icon: FiUsers, label: 'Active Campaigns', value: '3', change: '+1', color: 'purple' },
    { icon: FiTrendingUp, label: 'Total Reach', value: '245K', change: '+15%', color: 'green' },
    { icon: FiDollarSign, label: 'Budget Spent', value: '$6,700', change: '+12%', color: 'blue' },
    { icon: FiEye, label: 'Impressions', value: '1.2M', change: '+28%', color: 'orange' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-200 border border-green-200 dark:border-green-800';
      case 'completed': return 'text-blue-700 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-200 border border-blue-200 dark:border-blue-800';
      case 'pending': return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800';
      default: return 'text-slate-600 bg-slate-100 dark:bg-gray-800 dark:text-slate-300';
    }
  };

  const tabs = [
    { id: 'advertisements', label: 'Advertisements', icon: FiBriefcase },
    { id: 'content', label: 'Brand Content', icon: FiGrid },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 drop-shadow-sm">
            Startup Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-200">
            Manage your advertisements and brand content
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/50 dark:bg-gray-800/50 p-1.5 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700 inline-flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-all font-semibold ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-gray-700/50'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'advertisements' && (
            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Active Campaigns</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCreateAd(true)}
                    className="px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-bold shadow-md flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiPlus} className="w-5 h-5" />
                    <span>Create Advertisement</span>
                  </motion.button>
                </div>

                {getMyAdvertisements.loading ? (
                  <div className="flex justify-center items-center py-12">
                    <SafeIcon icon={FiBriefcase} className="w-8 h-8 text-purple-600 animate-spin" />
                    <span className="ml-3 text-lg text-slate-600 dark:text-slate-300">Loading...</span>
                  </div>
                ) : advertisements.filter(ad => ad.status === 'active').length === 0 ? (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiBriefcase} className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      No active campaigns yet. Create one to get started!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advertisements.filter(ad => ad.status === 'active').map(ad => (
                      <motion.div
                        key={ad._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            ad.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {ad.status}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditAd(ad)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <SafeIcon icon={FiEdit} className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAd(ad._id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{ad.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{ad.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400 capitalize">{ad.category}</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">{ad.budget || 'N/A'}</span>
                        </div>
                        <button
                          onClick={() => handleViewApplications(ad)}
                          className="mt-4 w-full py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors font-semibold"
                        >
                          View Applications ({ad.totalApplications || 0})
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Create/Edit Advertisement Modal */}
              <AnimatePresence>
                {(showCreateAd || editingAd) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => {
                      setShowCreateAd(false);
                      setEditingAd(null);
                      setNewAd({ title: '', description: '', category: 'other', budget: '', image: '' });
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {editingAd ? 'Edit Advertisement' : 'Create Advertisement'}
                        </h3>
                        <button
                          onClick={() => {
                            setShowCreateAd(false);
                            setEditingAd(null);
                            setNewAd({ title: '', description: '', category: 'other', budget: '', image: '' });
                          }}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <SafeIcon icon={FiX} className="w-6 h-6" />
                        </button>
                      </div>
                      <form onSubmit={editingAd ? handleUpdateAd : handleCreateAd} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Title *
                          </label>
                          <input
                            type="text"
                            value={newAd.title}
                            onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g., Instagram Collaboration Opportunity"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Description *
                          </label>
                          <textarea
                            value={newAd.description}
                            onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Describe the opportunity..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                              Category
                            </label>
                            <select
                              value={newAd.category}
                              onChange={(e) => setNewAd({ ...newAd, category: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="fashion">Fashion</option>
                              <option value="fitness">Fitness</option>
                              <option value="food">Food</option>
                              <option value="travel">Travel</option>
                              <option value="tech">Tech</option>
                              <option value="lifestyle">Lifestyle</option>
                              <option value="beauty">Beauty</option>
                              <option value="gaming">Gaming</option>
                              <option value="b2b">B2B</option>
                              <option value="business">Business</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                              Budget
                            </label>
                            <input
                              type="text"
                              value={newAd.budget}
                              onChange={(e) => setNewAd({ ...newAd, budget: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="e.g., $500-1000"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Image URL (optional)
                          </label>
                          <input
                            type="url"
                            value={newAd.image}
                            onChange={(e) => setNewAd({ ...newAd, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="flex space-x-4 pt-4">
                          <button
                            type="submit"
                            disabled={createAdvertisement.loading || updateAdvertisement.loading}
                            className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-bold disabled:opacity-50"
                          >
                            {editingAd ? 'Update' : 'Create'} Advertisement
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCreateAd(false);
                              setEditingAd(null);
                              setNewAd({ title: '', description: '', category: 'other', budget: '', image: '' });
                            }}
                            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-slate-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Applications Modal */}
              <AnimatePresence>
                {selectedAdApplications && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedAdApplications(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                          Applications for "{selectedAdApplications.ad.title}"
                        </h3>
                        <button
                          onClick={() => setSelectedAdApplications(null)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <SafeIcon icon={FiX} className="w-6 h-6" />
                        </button>
                      </div>
                      {selectedAdApplications.applications.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-slate-600 dark:text-slate-400">No applications yet</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {selectedAdApplications.applications.map(app => (
                            <div
                              key={app._id}
                              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-slate-200 dark:border-gray-600"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {app.userId?.name || 'Unknown'}
                                  </h4>
                                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                                    {app.userId?.email}
                                  </p>
                                  <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                                    <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                      app.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                                      app.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' :
                                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
                                    }`}>
                                      {app.status}
                                    </span>
                                  </div>
                                </div>
                                <Link
                                  to={`/influencer/${app.influencerId?._id}`}
                                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm"
                                >
                                  View Profile
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Brand Content Library</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddPost(!showAddPost)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-purple-500/20"
                >
                  <SafeIcon icon={showAddPost ? FiTrash2 : FiPlus} className="w-4 h-4" />
                  <span>{showAddPost ? 'Cancel' : 'Add Content'}</span>
                </motion.button>
              </div>

              <AnimatePresence>
                {showAddPost && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="glass-panel rounded-2xl p-6 border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Embed Brand Content</h3>
                      <form onSubmit={handleAddPost} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Platform</label>
                            <div className="relative">
                              <SafeIcon icon={newPost.platform === 'youtube' ? FiVideo : FiImage} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                              <select
                                value={newPost.platform}
                                onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white appearance-none"
                              >
                                <option value="instagram">Instagram</option>
                                <option value="youtube">YouTube</option>
                                <option value="tiktok">TikTok</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Content Title</label>
                            <input
                              type="text"
                              value={newPost.title}
                              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                              placeholder="e.g. New Product Demo"
                              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Content URL / Embed Code</label>
                          <div className="relative">
                            <SafeIcon icon={FiCode} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              value={newPost.url}
                              onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
                              placeholder="https://... or Paste Embed Code <blockquote...>"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white font-mono text-sm"
                              required
                            />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                            Paste the full URL or Embed Code (HTML) of your social media post.
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                          >
                            Add Content
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-panel rounded-2xl overflow-hidden group border border-white/60 dark:border-gray-700 flex flex-col"
                  >
                    <div className="flex-grow h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                      <SocialEmbed
                        url={item.url}
                        html={item.embedHtml}
                        type={item.platform}
                        title={item.title}
                        thumbnail={item.thumbnail}
                      />
                    </div>
                    <div className="p-4 bg-white/50 dark:bg-gray-800/50">
                      <div className="flex items-start justify-between">
                         <div className="flex-1 mr-2">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{item.title}</h4>
                            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                              <span>{item.platform === 'youtube' ? `${item.views} views` : `${item.likes} likes`}</span>
                              <span className="text-xs bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded">
                                Added recently
                              </span>
                            </div>
                         </div>
                         <button
                           onClick={() => handleDeletePost(item.id)}
                           className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                           title="Delete Post"
                         >
                           <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Company Settings</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Company Name</label>
                  <input type="text" defaultValue="TechNova Inc." className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Company Description</label>
                  <textarea rows={3} defaultValue="Leading innovator in drone technology..." className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 text-slate-900 dark:text-white" />
                </div>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">Save Changes</button>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-gray-700 mt-6">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Account Actions</h4>
                <button onClick={logout} className="px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center space-x-2">
                  <SafeIcon icon={FiLogOut} className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StartupDashboard;