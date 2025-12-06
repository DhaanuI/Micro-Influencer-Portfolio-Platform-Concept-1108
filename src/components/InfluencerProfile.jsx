import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const { 
  FiArrowLeft, FiUsers, FiTrendingUp, FiInstagram, FiYoutube, FiTwitter, 
  FiLock, FiUnlock, FiStar, FiEye, FiHeart, FiMessageCircle,
  FiMapPin, FiGlobe, FiMail, FiPhone
} = FiIcons;

const InfluencerProfile = () => {
  const { id } = useParams();
  const { user, openAuthModal } = useAuth();
  const [hasUnlockedContact, setHasUnlockedContact] = useState(false);

  // Mock data - in real app, fetch based on ID
  const influencer = {
    id: 1,
    name: 'Sarah Johnson',
    category: 'lifestyle',
    followers: 45000,
    engagement: 4.2,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop',
    platforms: ['instagram', 'youtube'],
    verified: true,
    bio: 'Lifestyle content creator passionate about sustainable living, wellness, and authentic storytelling. I love connecting with my audience through relatable content.',
    location: 'Los Angeles, CA',
    languages: ['English', 'Spanish'],
    pricing: {
      post: 500,
      story: 200,
      reel: 800,
      video: 1200
    },
    stats: {
      avgViews: 15000,
      avgLikes: 2300,
      avgComments: 180
    },
    recentPosts: [
      {
        id: 1,
        type: 'image',
        thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=300&fit=crop',
        likes: 2400,
        comments: 180,
        views: 15000
      },
      {
        id: 2,
        type: 'video',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        likes: 3200,
        comments: 240,
        views: 22000
      },
      {
        id: 3,
        type: 'image',
        thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
        likes: 1800,
        comments: 120,
        views: 12000
      }
    ],
    testimonials: [
      {
        id: 1,
        brand: 'EcoBeauty Co.',
        text: 'Sarah delivered exceptional content that perfectly aligned with our brand values. Her engagement rates exceeded our expectations.',
        rating: 5
      },
      {
        id: 2,
        brand: 'Wellness Brands',
        text: 'Professional, creative, and reliable. The campaign generated significant ROI for our product launch.',
        rating: 5
      }
    ]
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
        <img
          src={influencer.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute top-4 left-4">
          <Link to="/">
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
                    src={influencer.image}
                    alt={influencer.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700"
                  />
                  {influencer.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {influencer.name}
                  </h1>
                  <p className="text-purple-600 dark:text-purple-400 capitalize font-medium mb-2">
                    {influencer.category} Influencer
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {influencer.bio}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                      <span>{influencer.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                      <span>{influencer.languages.join(', ')}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-purple-600 dark:text-purple-400 mb-1">
                    <SafeIcon icon={FiUsers} className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {influencer.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-green-500 mb-1">
                    <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {influencer.engagement}%
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-blue-500 mb-1">
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {influencer.stats.avgViews.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Avg Views</div>
                </div>
              </div>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Posts</h3>
              <div className="grid grid-cols-3 gap-4">
                {influencer.recentPosts.map(post => (
                  <div key={post.id} className="relative group cursor-pointer">
                    <img
                      src={post.thumbnail}
                      alt="Post"
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="flex items-center space-x-4 text-white text-sm">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiHeart} className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Client Testimonials</h3>
              <div className="space-y-4">
                {influencer.testimonials.map(testimonial => (
                  <div key={testimonial.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{testimonial.brand}</span>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <SafeIcon key={i} icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Instagram Post</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${influencer.pricing.post}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Instagram Story</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${influencer.pricing.story}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Instagram Reel</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${influencer.pricing.reel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">YouTube Video</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${influencer.pricing.video}</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel bg-white dark:bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Contact & Social</h3>
              {hasUnlockedContact ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiInstagram} className="w-5 h-5 text-pink-500" />
                    <span className="text-slate-900 dark:text-white">@sarah.lifestyle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiYoutube} className="w-5 h-5 text-red-500" />
                    <span className="text-slate-900 dark:text-white">Sarah's Lifestyle</span>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-green-800 dark:text-green-400">
                      <SafeIcon icon={FiMail} className="w-4 h-4" />
                      <span>sarah@example.com</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-green-800 dark:text-green-400">
                      <SafeIcon icon={FiPhone} className="w-4 h-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={FiLock} className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Unlock contact information and social media handles to connect directly
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUnlockContact}
                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiUnlock} className="w-4 h-4" />
                    <span>Unlock for $10</span>
                  </motion.button>
                </div>
              )}
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
                {influencer.platforms.map(platform => (
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