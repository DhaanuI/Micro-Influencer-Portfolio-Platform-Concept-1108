import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiZap, FiTarget, FiBarChart2, FiGlobe, FiSmartphone } = FiIcons;

const Features = () => {
  const features = [
    {
      icon: FiShield,
      title: "Verified Authenticity",
      desc: "Every influencer and startup is vetted. We check social stats, engagement rates, and company details."
    },
    {
      icon: FiZap,
      title: "Instant Connections",
      desc: "Unlock contact details instantly with our pay-per-contact model. No waiting for approvals."
    },
    {
      icon: FiTarget,
      title: "Precise Targeting",
      desc: "Find the perfect match with advanced filters for niche, location, engagement, and price range."
    },
    {
      icon: FiBarChart2,
      title: "Real-time Analytics",
      desc: "Track campaign performance live. See ROI, reach, and engagement metrics in your dashboard."
    },
    {
      icon: FiGlobe,
      title: "Global Reach",
      desc: "Connect with creators and brands from over 50 countries. Expand your market internationally."
    },
    {
      icon: FiSmartphone,
      title: "Mobile First",
      desc: "Manage your portfolio and campaigns on the go with our fully responsive mobile design."
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Why Choose InfluenceMatch?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-gray-200"
          >
            Powerful tools for modern influencer marketing
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                <SafeIcon icon={feature.icon} className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;