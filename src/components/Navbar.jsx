import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const { FiSun, FiMoon, FiSettings, FiHome } = FiIcons;

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleDashboard = () => {
    if (user) {
      navigate(user.type === 'influencer' ? '/dashboard/influencer' : '/dashboard/startup');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-panel fixed top-0 w-full z-50 h-[72px] shadow-md border-b border-white/20 dark:border-slate-700"
      style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">IM</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
              InfluenceMatch
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {user && (
              <Link to="/feed">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-300 transition-colors shadow-sm"
                  title="Feed"
                >
                  <SafeIcon icon={FiHome} className="w-5 h-5" />
                </motion.button>
              </Link>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors shadow-sm"
            >
              <SafeIcon icon={isDark ? FiSun : FiMoon} className="w-5 h-5" />
            </motion.button>

            {user ? (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDashboard}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  <SafeIcon icon={FiSettings} className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Dashboard</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openAuthModal('login')}
                  className="px-5 py-2.5 text-slate-700 dark:text-white font-bold hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                >
                  Log In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openAuthModal('signup')}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg"
                >
                  Get Started
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;