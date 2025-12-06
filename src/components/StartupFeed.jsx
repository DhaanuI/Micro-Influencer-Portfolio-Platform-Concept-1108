import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiPlay, FiSearch, FiFilter, FiUserCheck, FiBarChart, FiLock, FiUnlock, FiEye, FiTrendingUp } = FiIcons;

const StartupFeed = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [unlockedItems, setUnlockedItems] = useState([]); // Track which items are unlocked
  
  const categories = ['All', 'Productivity', 'DevTools', 'Fintech', 'Marketing', 'AI Tools'];

  // SaaS-focused content data
  const showcaseItems = [
    {
      id: 1,
      title: "Notion Workflow Setup for Teams",
      thumbnail: "https://images.unsplash.com/photo-1481487484168-9b93072b23e5?w=800&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      influencerName: "Sarah Tech",
      category: "Productivity",
      stats: { views: "45K", conversion: "3.2%", signups: "420+" },
      type: "Tutorial",
      platform: "YouTube",
      price: "$15"
    },
    {
      id: 2,
      title: "VS Code AI Extension Review",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      influencerName: "Dev Alex",
      category: "DevTools",
      stats: { views: "12K", conversion: "5.8%", signups: "180+" },
      type: "Deep Dive",
      platform: "YouTube",
      price: "$20"
    },
    {
      id: 3,
      title: "Automating Finances with Stripe",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      influencerName: "Fintech Maya",
      category: "Fintech",
      stats: { views: "85K", conversion: "2.1%", signups: "350+" },
      type: "Case Study",
      platform: "LinkedIn",
      price: "$18"
    },
    {
      id: 4,
      title: "Jasper AI Copywriting Demo",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      influencerName: "Creative Sam",
      category: "AI Tools",
      stats: { views: "120K", conversion: "4.5%", signups: "1.2K+" },
      type: "Short",
      platform: "TikTok",
      price: "$12"
    },
    {
      id: 5,
      title: "Linear App Project Management",
      thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      influencerName: "Product James",
      category: "Productivity",
      stats: { views: "28K", conversion: "6.1%", signups: "290+" },
      type: "Review",
      platform: "YouTube",
      price: "$15"
    }
  ];

  const filteredItems = activeCategory === 'All' 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === activeCategory);

  const handleUnlock = (id) => {
    // In a real app, this would trigger a payment flow
    if (confirm("Unlock details for $5?")) {
      setUnlockedItems([...unlockedItems, id]);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            SaaS Creator Showcase
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Discover high-leverage content. Unlock creator details to connect.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
               <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search deliverables..." 
                 className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
               />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isUnlocked = unlockedItems.includes(item.id);
              
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-white uppercase tracking-wider">
                      {item.type}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-indigo-600/90 backdrop-blur-md rounded text-xs font-bold text-white">
                      {item.platform}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {/* Avatar is visible */}
                      <img src={item.avatar} alt="Creator" className="w-8 h-8 rounded-full mr-3 border border-slate-200 dark:border-slate-700" />
                      
                      {/* Name is hidden unless unlocked */}
                      <div className="flex-1">
                        {isUnlocked ? (
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{item.influencerName}</span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Verified Creator</span>
                            <span className="bg-slate-200 dark:bg-slate-700 h-4 w-16 rounded animate-pulse"></span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Metrics Grid - Blurred if locked */}
                    <div className="relative">
                      {!isUnlocked && (
                         <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex flex-col items-center justify-center rounded-lg border border-white/20">
                            <SafeIcon icon={FiLock} className="w-6 h-6 text-slate-900 dark:text-white mb-1" />
                            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Locked Stats</span>
                         </div>
                      )}
                      
                      <div className={`grid grid-cols-3 gap-2 py-3 border-t border-slate-100 dark:border-slate-800 ${!isUnlocked ? 'filter blur-sm select-none opacity-50' : ''}`}>
                        <div className="text-center">
                          <div className="text-xs text-slate-400 uppercase font-semibold">Views</div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{item.stats.views}</div>
                        </div>
                        <div className="text-center border-l border-slate-100 dark:border-slate-800">
                          <div className="text-xs text-slate-400 uppercase font-semibold">Conv.</div>
                          <div className="text-sm font-bold text-green-600 dark:text-green-400">{item.stats.conversion}</div>
                        </div>
                        <div className="text-center border-l border-slate-100 dark:border-slate-800">
                          <div className="text-xs text-slate-400 uppercase font-semibold">Signups</div>
                          <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{item.stats.signups}</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                       {isUnlocked ? (
                         <div className="flex gap-2">
                           <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                             <SafeIcon icon={FiUserCheck} className="w-4 h-4" />
                             <span>Contact</span>
                           </button>
                           <button className="flex-1 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                             View Profile
                           </button>
                         </div>
                       ) : (
                         <button 
                           onClick={() => handleUnlock(item.id)}
                           className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg"
                         >
                           <SafeIcon icon={FiUnlock} className="w-4 h-4" />
                           <span>Unlock Details & Stats</span>
                         </button>
                       )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to showcase your product?</h3>
            <Link to="/discover">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1">
                Find Your Creator Match
              </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default StartupFeed;