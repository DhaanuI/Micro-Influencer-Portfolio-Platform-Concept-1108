import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiZap, FiTarget, FiBarChart2, FiGlobe, FiSmartphone } = FiIcons;

const Features = () => {
  const features = [
    {
      icon: FiShield,
      title: "Verified SaaS Experts",
      desc: "Connect with creators who understand B2B, dev tools, and software. Every influencer is vetted for tech literacy."
    },
    {
      icon: FiZap,
      title: "Rapid Content Scaling",
      desc: "Fill your content calendar with high-quality product demos, tutorials, and reviews without managing a production team."
    },
    {
      icon: FiTarget,
      title: "Niche Targeting",
      desc: "Find creators with specific audiences: Developers, Marketers, Founders, or Enterprise decision-makers."
    },
    {
      icon: FiBarChart2,
      title: "Performance Metrics",
      desc: "Track signups, demos booked, and CTR directly. We focus on business outcomes, not just vanity metrics."
    },
    {
      icon: FiGlobe,
      title: "Global Tech Reach",
      desc: "Access tech communities in key markets. Localize your software launch with regional experts."
    },
    {
      icon: FiSmartphone,
      title: "Short-Form Video",
      desc: "Dominate TikTok and Reels with engaging tech snippets that simplify complex value propositions."
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
            Why Choose Influence Hub?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-gray-200"
          >
            The premier marketplace for SaaS and Tech content creation
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
              className="glass-panel p-8 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
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