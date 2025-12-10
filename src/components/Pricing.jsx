import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const { FiCheck, FiX, FiZap, FiTrendingUp } = FiIcons;

const Pricing = () => {
  const { user, login } = useAuth();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (tier) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await api.subscription.upgradeToPremium();
      if (response.success) {
        // Refresh user data
        const userResponse = await api.auth.getMe();
        if (userResponse?.user) {
          login(userResponse.user);
        }
        alert('Successfully upgraded to Premium! 🎉');
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert('Upgrade failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBoost = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await api.subscription.activateBoost();
      if (response.success) {
        // Refresh user data
        const userResponse = await api.auth.getMe();
        if (userResponse?.user) {
          login(userResponse.user);
        }
        alert('Promoter Boost activated for 48 hours! 🚀');
      }
    } catch (error) {
      console.error('Boost activation failed:', error);
      alert(error.message || 'Boost activation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Pricing tiers for Startups
  const startupTiers = [
    {
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      description: 'Perfect for trying out the platform',
      features: [
        { text: 'Post 1 Advertisement', included: true },
        { text: 'View applicants', included: false },
        { text: 'Click 1 influencer post only', included: true },
        { text: 'Basic analytics', included: false },
        { text: 'Priority support', included: false }
      ],
      cta: 'Current Plan',
      highlighted: false,
      current: user?.subscriptionTier === 'free'
    },
    {
      name: 'Premium',
      price: 29,
      yearlyPrice: 290,
      description: 'Full access for growing startups',
      features: [
        { text: 'Unlimited Advertisements', included: true },
        { text: 'View all applicants', included: true },
        { text: 'Click unlimited influencer posts', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority support', included: true }
      ],
      cta: 'Upgrade to Premium',
      highlighted: true,
      current: user?.subscriptionTier === 'premium'
    }
  ];

  // Pricing tiers for Influencers
  const influencerTiers = [
    {
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      description: 'Start building your portfolio',
      features: [
        { text: 'Add up to 3 posts', included: true },
        { text: 'Apply to 2 advertisements', included: true },
        { text: 'Basic profile', included: true },
        { text: 'Featured boost', included: false },
        { text: 'Priority support', included: false }
      ],
      cta: 'Current Plan',
      highlighted: false,
      current: user?.subscriptionTier === 'free'
    },
    {
      name: 'Premium',
      price: 29,
      yearlyPrice: 290,
      description: 'For 3 months - Unlimited opportunities',
      billingType: 'one-time', // One-time payment for 3 months
      duration: '3 months',
      features: [
        { text: 'Unlimited posts', included: true },
        { text: 'Unlimited applications', included: true },
        { text: 'Enhanced profile', included: true },
        { text: 'Analytics dashboard', included: true },
        { text: 'Priority support', included: true }
      ],
      cta: 'Upgrade to Premium',
      highlighted: true,
      current: user?.subscriptionTier === 'premium'
    }
  ];

  // Add-on for Influencers (One-time purchase)
  const influencerAddon = {
    name: 'Promoter Boost',
    price: 9,
    description: 'One-time 48-hour featured placement',
    features: [
      { text: '48-hour featured placement', included: true },
      { text: '3x more visibility', included: true },
      { text: 'Priority in startup searches', included: true },
      { text: 'Special badge on profile', included: true }
    ],
    cta: 'Activate Boost',
    isOneTime: true
  };

  const tiers = user?.userType === 'startup' ? startupTiers : influencerTiers;

  // Show both pricing sections if user is not logged in
  const showBothPricing = !user;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {showBothPricing ? 'Pricing Plans' : 'Choose Your Plan'}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            {showBothPricing
              ? 'Affordable pricing for startups and influencers'
              : user?.userType === 'startup'
                ? 'Find the perfect influencers for your brand'
                : 'Grow your influence and opportunities'}
          </p>

          {/* Billing Toggle - Hidden for now since we have one-time pricing */}
          {!showBothPricing && (
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-7 bg-slate-300 dark:bg-slate-600 rounded-full transition-colors"
              >
                <motion.div
                  animate={{ x: billingCycle === 'yearly' ? 28 : 2 }}
                  className="absolute top-1 w-5 h-5 bg-indigo-600 rounded-full"
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                Yearly
                <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </span>
            </div>
          )}
        </motion.div>

        {/* Show both pricing sections for non-logged-in users */}
        {showBothPricing ? (
          <>
            {/* Startup Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
                For Startups
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
                Find and collaborate with micro-influencers
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {startupTiers.map((tier, index) => (
                  <PricingCard
                    key={tier.name}
                    tier={tier}
                    billingCycle={billingCycle}
                    index={index}
                    onUpgrade={handleUpgrade}
                    loading={loading}
                  />
                ))}
              </div>
            </motion.div>

            {/* Influencer Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
                For Influencers
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
                Grow your influence and find opportunities
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {influencerTiers.map((tier, index) => (
                  <PricingCard
                    key={tier.name}
                    tier={tier}
                    billingCycle={billingCycle}
                    index={index}
                    onUpgrade={handleUpgrade}
                    loading={loading}
                  />
                ))}
              </div>
            </motion.div>

            {/* Promoter Boost Add-on */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                Boost Your Visibility (Influencers)
              </h2>
              <AddonCard
                addon={influencerAddon}
                onActivate={handleBoost}
                loading={loading}
              />
            </motion.div>
          </>
        ) : (
          <>
            {/* Pricing Cards for logged-in users */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {tiers.map((tier, index) => (
                <PricingCard
                  key={tier.name}
                  tier={tier}
                  billingCycle={billingCycle}
                  index={index}
                  onUpgrade={handleUpgrade}
                  loading={loading}
                />
              ))}
            </div>

            {/* Influencer Add-on for logged-in influencers */}
            {user?.userType === 'influencer' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                  Boost Your Visibility
                </h2>
                <AddonCard
                  addon={influencerAddon}
                  onActivate={handleBoost}
                  loading={loading}
                />
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ tier, billingCycle, index, onUpgrade, loading }) => {
  const price = billingCycle === 'yearly' ? tier.yearlyPrice : tier.price;
  const monthlyPrice = billingCycle === 'yearly' ? (tier.yearlyPrice / 12).toFixed(0) : tier.price;

  // Check if this is a one-time payment (for influencer premium)
  const isOneTime = tier.billingType === 'one-time';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glass-panel rounded-2xl p-8 ${
        tier.highlighted
          ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-xl shadow-indigo-500/20'
          : 'border border-slate-200 dark:border-slate-700'
      } ${tier.current ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
    >
      {tier.highlighted && (
        <div className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold rounded-full mb-4">
          MOST POPULAR
        </div>
      )}

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        {tier.name}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        {tier.description}
      </p>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold text-slate-900 dark:text-white">
            ${tier.price}
          </span>
          {isOneTime ? (
            <span className="text-slate-600 dark:text-slate-400 ml-2">
              for {tier.duration}
            </span>
          ) : (
            <span className="text-slate-600 dark:text-slate-400 ml-2">/month</span>
          )}
        </div>
        {!isOneTime && billingCycle === 'yearly' && tier.price > 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Billed ${tier.yearlyPrice} annually
          </p>
        )}
        {isOneTime && tier.price > 0 && (
          <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
            One-time payment
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <SafeIcon
              icon={feature.included ? FiCheck : FiX}
              className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                feature.included
                  ? 'text-green-500'
                  : 'text-slate-400 dark:text-slate-600'
              }`}
            />
            <span
              className={`text-sm ${
                feature.included
                  ? 'text-slate-700 dark:text-slate-300'
                  : 'text-slate-500 dark:text-slate-500 line-through'
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: tier.current || loading ? 1 : 1.02 }}
        whileTap={{ scale: tier.current || loading ? 1 : 0.98 }}
        disabled={tier.current || loading}
        onClick={() => !tier.current && tier.name === 'Premium' && onUpgrade('premium')}
        className={`w-full py-3 rounded-xl font-bold transition-all ${
          tier.highlighted && !tier.current
            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl'
            : tier.current
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
      >
        {loading ? 'Processing...' : tier.current ? 'Current Plan' : tier.cta}
      </motion.button>
    </motion.div>
  );
};

// Add-on Card Component
const AddonCard = ({ addon, onActivate, loading }) => {
  return (
    <div className="glass-panel rounded-2xl p-8 border-2 border-amber-500 dark:border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
      <div className="flex items-center mb-4">
        <SafeIcon icon={FiZap} className="w-8 h-8 text-amber-500 mr-3" />
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {addon.name}
        </h3>
      </div>

      <p className="text-slate-600 dark:text-slate-400 mb-6">
        {addon.description}
      </p>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">
            ${addon.price}
          </span>
          <span className="text-slate-600 dark:text-slate-400 ml-2">one-time</span>
        </div>
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1 font-medium">
          Active for 48 hours
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {addon.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <SafeIcon
              icon={FiTrendingUp}
              className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-amber-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        disabled={loading}
        onClick={onActivate}
        className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : addon.cta}
      </motion.button>
    </div>
  );
};

export default Pricing;

