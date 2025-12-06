import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const { FiTrendingUp, FiUsers, FiDollarSign, FiEye, FiHeart, FiMessageCircle, FiSettings, FiZap, FiStar, FiGrid, FiPlus, FiLink, FiVideo, FiImage, FiTrash2, FiExternalLink, FiLogOut } = FiIcons;

const InfluencerDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPost, setShowAddPost] = useState(false);
  
  // Mock Portfolio Data
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      title: 'My Sustainable Morning Routine',
      views: '125K'
    },
    {
      id: 2,
      platform: 'instagram',
      url: 'https://www.instagram.com/p/Cdb12345/',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop',
      title: 'Summer Fashion Haul',
      likes: '4.5K'
    }
  ]);

  const [newPost, setNewPost] = useState({ platform: 'instagram', url: '', title: '' });

  const handleAddPost = (e) => {
    e.preventDefault();
    // In a real app, we would fetch metadata/oEmbed here
    // For demo, we'll generate a mock item
    const newItem = {
      id: Date.now(),
      platform: newPost.platform,
      url: newPost.url,
      title: newPost.title,
      thumbnail: newPost.platform === 'youtube' ? `https://img.youtube.com/vi/${getYouTubeID(newPost.url)}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop', // Generic social placeholder
      views: '0',
      likes: '0'
    };
    setPortfolioItems([newItem, ...portfolioItems]);
    setNewPost({ platform: 'instagram', url: '', title: '' });
    setShowAddPost(false);
  };

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleDeletePost = (id) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
  };

  // Stats Data
  const stats = [
    { icon: FiUsers, label: 'Total Followers', value: '45.2K', change: '+12%', color: 'purple' },
    { icon: FiTrendingUp, label: 'Engagement Rate', value: '4.2%', change: '+0.3%', color: 'green' },
    { icon: FiDollarSign, label: 'Monthly Earnings', value: '$2,450', change: '+18%', color: 'blue' },
    { icon: FiEye, label: 'Total Reach', value: '156K', change: '+25%', color: 'orange' }
  ];

  const recentCampaigns = [
    { id: 1, brand: 'EcoBeauty Co.', type: 'Instagram Post', amount: '$500', status: 'completed', date: '2024-01-15' },
    { id: 2, brand: 'Wellness Brands', type: 'YouTube Video', amount: '$1,200', status: 'in_progress', date: '2024-01-18' },
    { id: 3, brand: 'Tech Startup', type: 'Story Series', amount: '$300', status: 'pending', date: '2024-01-20' }
  ];

  const automationServices = [
    { name: 'Auto Profile Optimization', description: 'AI-powered bio updates and hashtag optimization', price: '$29/month', active: true },
    { name: 'Reach Boost Package', description: 'Automated engagement and content amplification', price: '$79/month', active: false },
    { name: 'Content Scheduler Pro', description: 'Advanced scheduling with best-time posting', price: '$49/month', active: true }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-200 border border-green-200 dark:border-green-800';
      case 'in_progress': return 'text-blue-700 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-200 border border-blue-200 dark:border-blue-800';
      case 'pending': return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800';
      default: return 'text-slate-600 bg-slate-100 dark:bg-gray-800 dark:text-slate-300';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiTrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: FiGrid },
    { id: 'campaigns', label: 'Campaigns', icon: FiStar },
    { id: 'automation', label: 'Automation', icon: FiZap },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 drop-shadow-sm">
            Influencer Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-200">
            Manage your profile, campaigns, and grow your influence
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={FiHeart} className="w-5 h-5 text-red-500" />
                        <span className="text-slate-700 dark:text-slate-200 font-medium">Likes</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-lg">2,340</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={FiMessageCircle} className="w-5 h-5 text-blue-500" />
                        <span className="text-slate-700 dark:text-slate-200 font-medium">Comments</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-lg">186</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={FiEye} className="w-5 h-5 text-green-500" />
                        <span className="text-slate-700 dark:text-slate-200 font-medium">Views</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-lg">15,420</span>
                    </div>
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('portfolio')}
                      className="w-full p-4 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-700 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors text-left font-bold"
                    >
                      Update Portfolio
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-left font-bold"
                    >
                      View Analytics
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Content Portfolio</h2>
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
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Embed New Post</h3>
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
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Post Title</label>
                            <input
                              type="text"
                              value={newPost.title}
                              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                              placeholder="e.g. Summer Vlog 2024"
                              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Post URL / Embed Link</label>
                          <div className="relative">
                            <SafeIcon icon={FiLink} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                              type="url"
                              value={newPost.url}
                              onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
                              placeholder="https://..."
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white"
                              required
                            />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                            Paste the full URL of your social media post. We'll handle the embedding.
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                          >
                            Add to Portfolio
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
                    className="glass-panel rounded-2xl overflow-hidden group border border-white/60 dark:border-gray-700"
                  >
                    <div className="relative aspect-video bg-slate-100 dark:bg-gray-800">
                      {item.platform === 'youtube' && getYouTubeID(item.url) ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getYouTubeID(item.url)}`}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0"
                        ></iframe>
                      ) : (
                        <>
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-white text-slate-900 rounded-lg font-bold flex items-center space-x-2 hover:bg-purple-50"
                            >
                              <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                              <span>View on {item.platform}</span>
                            </a>
                          </div>
                        </>
                      )}
                      {/* Platform Badge */}
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-bold text-white capitalize flex items-center space-x-1">
                        <SafeIcon icon={item.platform === 'youtube' ? FiVideo : FiImage} className="w-3 h-3" />
                        <span>{item.platform}</span>
                      </div>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeletePost(item.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{item.title}</h4>
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>{item.platform === 'youtube' ? `${item.views} views` : `${item.likes} likes`}</span>
                        <span className="text-xs bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded">
                          Added recently
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Campaign History</h3>
                <button className="text-purple-600 dark:text-purple-300 font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-gray-800">
                    <tr>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Brand</th>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Type</th>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Amount</th>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Status</th>
                      <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-gray-700 bg-white dark:bg-slate-900/50">
                    {recentCampaigns.map(campaign => (
                      <tr key={campaign.id} className="hover:bg-slate-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">{campaign.brand}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{campaign.type}</td>
                        <td className="px-6 py-4 text-slate-900 dark:text-white font-bold">{campaign.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(campaign.status)}`}>
                            {campaign.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{campaign.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'automation' && (
            <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Automation Services</h3>
              <div className="grid gap-4">
                {automationServices.map((service, index) => (
                  <div key={index} className="bg-white/50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-bold text-slate-900 dark:text-white">{service.name}</h4>
                        {service.active && <span className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 text-xs px-2 py-0.5 rounded font-bold">Active</span>}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{service.description}</p>
                      <span className="text-purple-600 dark:text-purple-300 font-bold">{service.price}</span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-bold transition-colors ${service.active ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300' : 'bg-purple-600 text-white'}`}>
                      {service.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Profile Settings</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Display Name</label>
                  <input type="text" defaultValue="Sarah Johnson" className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Bio</label>
                  <textarea rows={3} defaultValue="Lifestyle content creator..." className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 text-slate-900 dark:text-white" />
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

export default InfluencerDashboard;