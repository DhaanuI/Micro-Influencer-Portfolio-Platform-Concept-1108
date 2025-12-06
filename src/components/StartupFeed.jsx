import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiMessageCircle, FiSend, FiBookmark, FiMoreHorizontal, FiSearch } = FiIcons;

const StartupFeed = () => {
  // Mock Feed Data - Instagram style for Influencers
  const [posts, setPosts] = useState([
    {
      id: 1,
      influencerName: "Sarah Johnson",
      handle: "sarah.lifestyle",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=700&fit=crop",
      caption: "Loving the summer vibes! Thanks to @EcoBeauty for these amazing sustainable products. #ad #summer #ecofriendly",
      likes: "2,453",
      comments: 124,
      time: "2 HOURS AGO"
    },
    {
      id: 2,
      influencerName: "Alex Chen",
      handle: "tech_guru",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=700&fit=crop",
      caption: "The new setup is finally complete! Check out the link in bio for full specs. #setupwar #tech #workspace",
      likes: "15.2k",
      comments: 892,
      time: "5 HOURS AGO"
    },
    {
      id: 3,
      influencerName: "Maya Patel",
      handle: "maya.fashion",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=700&fit=crop",
      caption: "City lights and autumn nights. Wearing the new collection from @UrbanStyle.",
      likes: "8,932",
      comments: 345,
      time: "1 DAY AGO"
    }
  ]);

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="glass-panel rounded-2xl p-4 mb-6 sticky top-20 z-30 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Influencer Feed</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Discover trending content</p>
        </div>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full">
                  <img src={post.avatar} alt={post.influencerName} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white hover:text-slate-600">{post.handle}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{post.location}</p>
                </div>
              </div>
              <SafeIcon icon={FiMoreHorizontal} className="text-slate-900 dark:text-white cursor-pointer" />
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800">
              <img src={post.image} alt="Post" className="w-full h-full object-cover" />
            </div>

            {/* Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <SafeIcon icon={FiHeart} className="w-7 h-7 text-slate-900 dark:text-white cursor-pointer hover:text-slate-600" />
                  <SafeIcon icon={FiMessageCircle} className="w-7 h-7 text-slate-900 dark:text-white cursor-pointer hover:text-slate-600" />
                  <SafeIcon icon={FiSend} className="w-7 h-7 text-slate-900 dark:text-white cursor-pointer hover:text-slate-600" />
                </div>
                <SafeIcon icon={FiBookmark} className="w-7 h-7 text-slate-900 dark:text-white cursor-pointer hover:text-slate-600" />
              </div>

              <div className="font-bold text-sm text-slate-900 dark:text-white mb-2">{post.likes} likes</div>
              <div className="text-sm text-slate-900 dark:text-white mb-2">
                <span className="font-bold mr-2">{post.handle}</span>
                {post.caption}
              </div>
              <div className="text-slate-500 text-sm cursor-pointer mb-2">View all {post.comments} comments</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide">{post.time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button for Discovery */}
      <Link to="/discover">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-xl shadow-purple-500/30 flex items-center justify-center z-50 hover:shadow-purple-500/50 transition-shadow border border-white/20"
        >
          <SafeIcon icon={FiSearch} className="w-6 h-6" />
        </motion.button>
      </Link>
    </div>
  );
};

export default StartupFeed;