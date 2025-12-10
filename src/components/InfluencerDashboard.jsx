import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SocialEmbed from '../common/SocialEmbed';
import { useAuth } from '../context/AuthContext';
import { useInfluencer, useAdvertisement } from '../hooks/useAPI';
import api from '../services/api';

const { FiTrendingUp, FiUsers, FiDollarSign, FiEye, FiHeart, FiMessageCircle, FiSettings, FiZap, FiStar, FiGrid, FiPlus, FiLink, FiVideo, FiImage, FiTrash2, FiExternalLink, FiLogOut, FiCode, FiActivity, FiClock, FiBriefcase } = FiIcons;

const InfluencerDashboard = () => {
  const { user, logout } = useAuth();
  const { updateProfile, addEmbed } = useInfluencer();
  const { getMyApplications } = useAdvertisement();
  const [activeTab, setActiveTab] = useState('applications');
  const [showAddPost, setShowAddPost] = useState(false);
  const [boostActive, setBoostActive] = useState(false);
  const [boostTimeLeft, setBoostTimeLeft] = useState(0); // in seconds
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);

  // Load profile data and applications on mount
  useEffect(() => {
    const loadData = async () => {
      // Get profile from auth/me
      const profileResult = await api.auth.getMe();
      if (profileResult?.user) {
        setProfile(profileResult.user);
      }

      // Load applications
      const appsResult = await getMyApplications.execute();
      if (appsResult?.data) {
        setApplications(appsResult.data);
      }
    };
    loadData();
  }, []);

  // Handle Boost Timer
  useEffect(() => {
    let interval;
    if (boostActive && boostTimeLeft > 0) {
      interval = setInterval(() => {
        setBoostTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (boostTimeLeft === 0) {
      setBoostActive(false);
    }
    return () => clearInterval(interval);
  }, [boostActive, boostTimeLeft]);

  const handleActivateBoost = () => {
    // Simulate payment process
    if (confirm("Activate 48-hour boost for $19.99?")) {
      setBoostActive(true);
      setBoostTimeLeft(48 * 60 * 60); // 48 hours in seconds
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  // Mock Portfolio Data
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1, 
      platform: 'youtube', 
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
      title: 'My Sustainable Morning Routine', 
      views: '125K',
      thumbnail: null
    },
    {
      id: 2,
      platform: 'instagram',
      title: 'Greta by Questera',
      likes: '4.5K',
      embedHtml: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DRc6Z1VgIi/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF;border:0;border-radius:3px;box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15);margin: 1px;max-width:540px;min-width:326px;padding:0;width:99.375%;width:-webkit-calc(100% - 2px);width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DRc6Z1VgIi/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF;line-height:0;padding:0 0;text-align:center;text-decoration:none;width:100%;" target="_blank"> <div style=" display: flex;flex-direction: row;align-items: center;"> <div style="background-color: #F4F4F4;border-radius: 50%;flex-grow: 0;height: 40px;margin-right: 14px;width: 40px;"></div> <div style="display: flex;flex-direction: column;flex-grow: 1;justify-content: center;"> <div style=" background-color: #F4F4F4;border-radius: 4px;flex-grow: 0;height: 14px;margin-bottom: 6px;width: 100px;"></div> <div style=" background-color: #F4F4F4;border-radius: 4px;flex-grow: 0;height: 14px;width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block;height:50px;margin:0 auto 12px;width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000,-20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0;font-family:Arial,sans-serif;font-size:14px;font-style:normal;font-weight:550;line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex;flex-direction: row;margin-bottom: 14px;align-items: center;"><div> <div style="background-color: #F4F4F4;border-radius: 50%;height: 12.5px;width: 12.5px;transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4;height: 12.5px;transform: rotate(-45deg) translateX(3px) translateY(1px);width: 12.5px;flex-grow: 0;margin-right: 14px;margin-left: 2px;"></div> <div style="background-color: #F4F4F4;border-radius: 50%;height: 12.5px;width: 12.5px;transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4;border-radius: 50%;flex-grow: 0;height: 20px;width: 20px;"></div> <div style=" width: 0;height: 0;border-top: 2px solid transparent;border-left: 6px solid #f4f4f4;border-bottom: 2px solid transparent;transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px;border-top: 8px solid #F4F4F4;border-right: 8px solid transparent;transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4;flex-grow: 0;height: 12px;width: 16px;transform: translateY(-4px);"></div> <div style=" width: 0;height: 0;border-top: 8px solid #F4F4F4;border-left: 8px solid transparent;transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex;flex-direction: column;flex-grow: 1;justify-content: center;margin-bottom: 24px;"> <div style=" background-color: #F4F4F4;border-radius: 4px;flex-grow: 0;height: 14px;margin-bottom: 6px;width: 224px;"></div> <div style=" background-color: #F4F4F4;border-radius: 4px;flex-grow: 0;height: 14px;width: 144px;"></div></div></a><p style=" color:#c9c8cd;font-family:Arial,sans-serif;font-size:14px;line-height:17px;margin-bottom:0;margin-top:8px;overflow:hidden;padding:8px 0 7px;text-align:center;text-overflow:ellipsis;white-space:nowrap;"><a href="https://www.instagram.com/reel/DRc6Z1VgIi/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd;font-family:Arial,sans-serif;font-size:14px;font-style:normal;font-weight:normal;line-height:17px;text-decoration:none;" target="blank">A post shared by Greta by Questera (@greta.ai)</a></p></div></blockquote>`
    }
  ]);

  const [newPost, setNewPost] = useState({ platform: 'instagram', url: '', title: '' });

  const handleAddPost = (e) => {
    e.preventDefault();
    const isHtml = newPost.url.trim().startsWith('<');
    
    const newItem = {
      id: Date.now(),
      platform: newPost.platform,
      title: newPost.title,
      embedHtml: isHtml ? newPost.url : null,
      url: isHtml ? null : newPost.url,
      thumbnail: !isHtml && newPost.platform !== 'youtube' ? 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop' : null,
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
      case 'completed':
      case 'accepted': return 'text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-200 border border-green-200 dark:border-green-800';
      case 'in_progress': return 'text-blue-700 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-200 border border-blue-200 dark:border-blue-800';
      case 'pending': return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800';
      case 'rejected': return 'text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-200 border border-red-200 dark:border-red-800';
      default: return 'text-slate-600 bg-slate-100 dark:bg-gray-800 dark:text-slate-300';
    }
  };

  const tabs = [
    { id: 'applications', label: 'Applications', icon: FiBriefcase },
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
          {activeTab === 'applications' && (
            <div className="glass-panel rounded-2xl p-8 border border-white/60 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">My Applications</h3>
                <span className="text-slate-600 dark:text-slate-400">{applications.length} total</span>
              </div>

              {getMyApplications.loading ? (
                <div className="flex justify-center items-center py-12">
                  <SafeIcon icon={FiActivity} className="w-8 h-8 text-purple-600 animate-spin" />
                  <span className="ml-3 text-lg text-slate-600 dark:text-slate-300">Loading applications...</span>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <SafeIcon icon={FiBriefcase} className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    No applications yet. Browse opportunities to get started!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-gray-800">
                      <tr>
                        <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Opportunity</th>
                        <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Company</th>
                        <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Budget</th>
                        <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Status</th>
                        <th className="text-left px-6 py-4 text-slate-700 dark:text-slate-200 font-bold text-sm uppercase">Applied On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-gray-700 bg-white dark:bg-slate-900/50">
                      {applications.map(application => (
                        <tr key={application._id} className="hover:bg-slate-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">
                            {application.advertisementId?.title || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                            {application.advertisementId?.startupId?.companyName || application.advertisementId?.startupId?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-slate-900 dark:text-white font-bold">
                            {application.advertisementId?.budget || 'Not specified'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                            {new Date(application.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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