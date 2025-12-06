import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageSquare, FiHeart, FiShare2, FiMoreHorizontal, FiGlobe } = FiIcons;

const InfluencerFeed = () => {
  // Mock Feed Data - Twitter style for Startups posting news/requests
  const [posts, setPosts] = useState([
    {
      id: 1,
      brandName: "EcoLife Startup",
      handle: "@ecolife_hq",
      logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop",
      time: "2h ago",
      content: "We just closed our Series A funding! Now looking for 10 lifestyle influencers to help us launch our new sustainable bottle line. Budget: $5k/influencer. DM if interested!",
      likes: 124,
      comments: 45,
      shares: 12,
      tags: ["#startup", "#hiring", "#influencers"]
    },
    {
      id: 2,
      brandName: "TechNova",
      handle: "@technova_inc",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      time: "4h ago",
      content: "Launching the world's smallest drone next week. Need tech reviewers who can create detailed unboxing videos. Units ready to ship!",
      image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&h=400&fit=crop",
      likes: 856,
      comments: 120,
      shares: 89,
      tags: ["#tech", "#reviewers", "#drone"]
    },
    {
      id: 3,
      brandName: "FashionForward",
      handle: "@fashionfwd",
      logo: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=100&h=100&fit=crop",
      time: "6h ago",
      content: "Looking for fashion creators in NYC for a photoshoot event this weekend. Paid opportunity + free merch!",
      likes: 342,
      comments: 89,
      shares: 24,
      tags: ["#fashion", "#nyc", "#event"]
    }
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="glass-panel rounded-2xl p-4 mb-6 sticky top-20 z-30">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Startup Updates</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Latest news and opportunities from brands</p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <img src={post.logo} alt={post.brandName} className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 dark:text-white">{post.brandName}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{post.handle}</span>
                    <span className="text-slate-400 dark:text-slate-600 text-sm">· {post.time}</span>
                  </div>
                  <SafeIcon icon={FiMoreHorizontal} className="text-slate-400 cursor-pointer" />
                </div>
                
                <p className="text-slate-800 dark:text-slate-200 mb-4 whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>

                {post.image && (
                  <img src={post.image} alt="Post content" className="w-full h-64 object-cover rounded-xl mb-4 border border-slate-200 dark:border-slate-700" />
                )}

                <div className="flex items-center space-x-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-blue-500 hover:underline text-sm cursor-pointer">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                  <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                      <SafeIcon icon={FiMessageSquare} className="w-5 h-5" />
                    </div>
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-500 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-green-500/10">
                      <SafeIcon icon={FiGlobe} className="w-5 h-5" />
                    </div>
                    <span>Apply</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-pink-500 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                      <SafeIcon icon={FiHeart} className="w-5 h-5" />
                    </div>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                      <SafeIcon icon={FiShare2} className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerFeed;