import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiDollarSign, FiTag, FiUsers, FiCheckCircle } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const AdvertisementCard = ({ 
  advertisement, 
  onApply, 
  onView, 
  showApplyButton = false,
  showApplicationCount = false,
  hasApplied = false,
  isLoading = false
}) => {
  const {
    _id,
    image,
    title,
    description,
    category,
    budget,
    status,
    totalApplications,
    createdAt,
    startupId
  } = advertisement;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getCategoryColor = (cat) => {
    const colors = {
      fashion: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      fitness: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      food: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      travel: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      tech: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      lifestyle: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      beauty: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      gaming: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      b2b: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      business: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
      other: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[cat] || colors.other;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={() => onView && onView(_id)}
    >
      {/* Image */}
      {image && (
        <div className="h-48 overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      {!image && (
        <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <SafeIcon icon={FiTag} className="w-16 h-16 text-white opacity-50" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getCategoryColor(category)}`}>
            {category}
          </span>
          {status === 'closed' && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
              Closed
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Company Name */}
        {startupId && (
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-3">
            {startupId.companyName || startupId.name}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
          {budget && (
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
              <span>{budget}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>{formatDate(createdAt)}</span>
          </div>
          {showApplicationCount && (
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiUsers} className="w-4 h-4" />
              <span>{totalApplications || 0} applications</span>
            </div>
          )}
        </div>

        {/* Apply Button */}
        {showApplyButton && status === 'active' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply && onApply(_id);
            }}
            disabled={hasApplied || isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${
              hasApplied
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {hasApplied ? (
              <span className="flex items-center justify-center space-x-2">
                <SafeIcon icon={FiCheckCircle} className="w-5 h-5" />
                <span>Applied</span>
              </span>
            ) : isLoading ? (
              'Applying...'
            ) : (
              'Apply Now'
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AdvertisementCard;

