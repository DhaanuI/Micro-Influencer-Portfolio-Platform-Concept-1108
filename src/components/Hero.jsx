import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const { FiTrendingUp, FiUsers, FiZap, FiArrowRight } = FiIcons;

const Hero = () => {
  const { openAuthModal } = useAuth();

  const stats = [
    { icon: FiUsers, label: 'Active Influencers', value: '10K+' },
    { icon: FiTrendingUp, label: 'Successful Campaigns', value: '5K+' },
    { icon: FiZap, label: 'Brands Connected', value: '1K+' }
  ];

  return (
    <div className="relative overflow-hidden pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center relative z-10">
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight"
        >
          Connect Brands with <br />
          <span className="relative inline-block mt-2 px-4">
            {/* Ambient Glow - Matched to Button Colors */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 dark:opacity-40 blur-2xl rounded-xl"></span>
            
            {/* Main Text with Gradient and Drop Shadow - Added dark mode gradient colors */}
            <span className="relative bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(124,58,237,0.5)] filter brightness-110">
              Perfect Influencers
            </span>
            
            {/* Decorative underline/accent - Matched to Button Primary Color */}
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-purple-600 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          This platform acts as a bridge between small-scale startups and micro-influencers. Discover vetted creators, view portfolios, and launch campaigns in minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openAuthModal('signup')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all text-lg font-bold flex items-center justify-center space-x-2 border border-transparent"
          >
            <span>Join as Influencer</span>
            <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openAuthModal('signup')}
            className="px-8 py-4 bg-white dark:bg-gray-800 text-slate-900 dark:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-all text-lg font-bold border border-slate-200 dark:border-gray-600 shadow-lg"
          >
            Hire Influencers
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-panel rounded-2xl p-8 transform hover:-translate-y-1 transition-transform duration-300 border border-white/50 dark:border-gray-700">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:bg-gray-800 dark:from-gray-800 dark:to-gray-800 rounded-2xl mx-auto mb-4 border border-purple-200 dark:border-gray-600 shadow-inner">
                <SafeIcon icon={stat.icon} className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-lg text-slate-600 dark:text-slate-300 font-semibold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;