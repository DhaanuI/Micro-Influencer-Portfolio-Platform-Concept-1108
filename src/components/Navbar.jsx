import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const { FiSettings, FiHome, FiGrid, FiLogOut, FiDollarSign } = FiIcons;

const Navbar = () => {
  const { user, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboard = () => {
    if (user) {
      navigate(user.userType === 'influencer' ? '/dashboard/influencer' : '/dashboard/startup');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="shadow-lg shadow-indigo-500/30"
            >
              <Logo size={40} className="group-hover:drop-shadow-lg transition-all" />
            </motion.div>
            <span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
              Influence Hub
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Link to="/feed">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors shadow-sm flex items-center space-x-2"
                    title="Showcase"
                  >
                    <SafeIcon icon={FiGrid} className="w-5 h-5" />
                    <span className="hidden md:inline text-sm font-medium">Showcase</span>
                  </motion.button>
                </Link>

                <Link to="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 border border-amber-400 text-white hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm flex items-center space-x-2"
                    title="Pricing"
                  >
                    <SafeIcon icon={FiDollarSign} className="w-5 h-5" />
                    <span className="hidden md:inline text-sm font-medium">Pricing</span>
                  </motion.button>
                </Link>
              </>
            )}

            {user ? (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDashboard}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                >
                  <SafeIcon icon={FiSettings} className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Dashboard</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-red-500/25 transition-all"
                  title="Logout"
                >
                  <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openAuthModal('login')}
                  className="px-5 py-2.5 text-slate-700 dark:text-white font-bold hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
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