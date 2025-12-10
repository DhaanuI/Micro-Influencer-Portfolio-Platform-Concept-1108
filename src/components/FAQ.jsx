import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown } = FiIcons;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is this platform about?",
      answer: "This platform acts as a bridge between small-scale startups and micro-influencers, helping startups find authentic creators to promote their products and helping influencers discover collaboration opportunities."
    },
    {
      question: "How do I get started as a startup?",
      answer: "Sign up as a startup, browse through our verified micro-influencers, view their portfolios, and post advertisements for collaboration opportunities. You can upgrade to Premium to unlock unlimited ads and view all applicants."
    },
    {
      question: "How do I get started as an influencer?",
      answer: "Create your profile, add your social media posts (Instagram, LinkedIn, YouTube), and start applying to startup advertisements. Build your portfolio and showcase your content to attract collaboration opportunities."
    },
    {
      question: "What are the pricing tiers?",
      answer: "We offer Free and Premium tiers for both startups and influencers. Free tier has limited features, while Premium unlocks unlimited posts, applications, and advanced features. Influencers can also purchase a Promoter Boost for 48-hour featured placement."
    },
    {
      question: "What is Promoter Boost?",
      answer: "Promoter Boost is a one-time $9 add-on for influencers that features your profile at the top of search results for 48 hours, giving you 3x more visibility and priority placement in startup searches."
    },
    {
      question: "How does the free tier work?",
      answer: "Startups on free tier can post 1 advertisement and click 1 influencer post. Influencers can add up to 3 posts and apply to 2 advertisements. Upgrade to Premium for unlimited access."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes! You can upgrade to Premium anytime to unlock all features. Premium subscriptions are valid for 3 months for influencers and 1 month for startups."
    },
    {
      question: "How are influencers verified?",
      answer: "All influencers are vetted for authenticity and content quality. We verify their social media accounts and ensure they have genuine engagement with their audience."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-gray-200"
          >
            Everything you need to know about our platform
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <SafeIcon 
                    icon={FiChevronDown} 
                    className="w-5 h-5 text-slate-600 dark:text-slate-400" 
                  />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

