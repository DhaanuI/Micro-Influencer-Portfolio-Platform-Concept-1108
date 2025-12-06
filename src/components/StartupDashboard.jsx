import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SocialEmbed from '../common/SocialEmbed';
import { useAuth } from '../context/AuthContext';

const { FiSearch, FiFilter, FiUsers, FiTrendingUp, FiDollarSign, FiEye, FiHeart, FiStar, FiGrid, FiPlus, FiLink, FiVideo, FiImage, FiTrash2, FiExternalLink, FiSettings, FiLogOut, FiCode } = FiIcons;

const StartupDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('discover');
  const [showAddPost, setShowAddPost] = useState(false);

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
    { id: 'discover', label: 'Discover', icon: FiSearch },
    { id: 'saved', label: 'Saved', icon: FiHeart },
    { id: 'campaigns', label: 'Campaigns', icon: FiStar },
    { id: 'content', label: 'Brand Content', icon: FiGrid },
    { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 drop-shadow-sm">
            Brand Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-200">
            Discover influencers, manage campaigns, and track performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-6 border border-white/60 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100 dark:bg-gray-800`}>
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-300`} />
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
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
          {activeTab === 'discover' && (
            <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Discover Influencers</h3>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    Find the perfect match for your brand
                  </p>
                </div>
                <Link to="/discover">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold shadow-lg shadow-purple-500/20"
                  >
                    Browse Full Directory
                  </motion.button>
                </Link>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-300 w-5 h-5" />
                  <input type="text" placeholder="Search by name, category, or keywords..." className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-400 shadow-sm" />
                </div>
                <div className="flex items-center space-x-2 relative">
                  <SafeIcon icon={FiFilter} className="absolute left-4 z-10 text-slate-400 dark:text-slate-300 w-5 h-5" />
                  <select className="pl-12 pr-10 py-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-white shadow-sm appearance-none min-w-[200px] cursor-pointer">
                    <option>All Categories</option>
                    <option>Lifestyle</option>
                    <option>Tech</option>
                    <option>Fashion</option>
                    <option>Food</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Saved Influencers</h3>
              <div className="grid gap-4">
                {savedInfluencers.map(influencer => (
                  <div key={influencer.id} className="bg-white/50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                      <img src={influencer.image} alt={influencer.name} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-600" />
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{influencer.name}</h4>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-300 capitalize mb-1">{influencer.category}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                          <span className="bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded">{influencer.followers.toLocaleString()} followers</span>
                          <span className="bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded">{influencer.engagement}% engagement</span>
                          <span className="bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded">{influencer.priceRange}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                      <Link to={`/influencer/${influencer.id}`} className="flex-1 md:flex-none">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-5 py-2.5 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors font-medium"
                        >
                          View Profile
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 md:flex-none px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
                      >
                        Contact
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Campaign Management</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-bold shadow-md"
                >
                  + New Campaign
                </motion.button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-gray-800">
                    <tr>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider">Campaign</th>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider">Influencers</th>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider">Budget</th>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase tracking-wider">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-gray-700 bg-white dark:bg-slate-900/50">
                    {campaigns.map(campaign => (
                      <tr key={campaign.id} className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">{campaign.name}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{campaign.influencers} influencers</td>
                        <td className="px-6 py-4 text-slate-900 dark:text-white font-bold">{campaign.budget}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                          {campaign.startDate} - {campaign.endDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                    <div className="flex-grow">
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

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Campaign Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
                    <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-300 mb-2">1.2M</div>
                    <div className="text-purple-900 dark:text-purple-100 font-medium">Total Impressions</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
                    <div className="text-4xl font-extrabold text-green-600 dark:text-green-300 mb-2">4.8%</div>
                    <div className="text-green-900 dark:text-green-100 font-medium">Avg Engagement</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                    <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-300 mb-2">$2.30</div>
                    <div className="text-blue-900 dark:text-blue-100 font-medium">Cost per Engagement</div>
                  </div>
                </div>
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