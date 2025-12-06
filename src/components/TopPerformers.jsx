import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiAward, FiStar } = FiIcons;

const TopPerformers = () => {
  const performers = [
    {
      name: "Anna Davis",
      role: "Lifestyle Creator",
      metric: "3.2M Reach",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
      badge: "Top Growth"
    },
    {
      name: "TechFlow Inc.",
      role: "SaaS Startup",
      metric: "500% ROI",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop",
      badge: "Best ROI"
    },
    {
      name: "Mark Wilson",
      role: "Tech Reviewer",
      metric: "12% Engagement",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      badge: "Most Engaged"
    }
  ];

  return (
    <section className="py-20 bg-black/5 dark:bg-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 drop-shadow-sm">
              Hall of Fame
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-200">
              Recognizing our best performing partners this month
            </p>
          </div>
          <button className="hidden md:block text-purple-600 dark:text-purple-300 font-bold hover:underline mt-4 md:mt-0 text-lg">
            View Leaderboard →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {performers.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
            >
              <div className="absolute top-0 right-0 p-3 bg-gradient-to-l from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-bl-2xl shadow-md z-10">
                {item.badge}
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 p-1"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-300 font-medium">{item.role}</p>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 flex items-center justify-between border border-white/20 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Monthly Record</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">{item.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPerformers;