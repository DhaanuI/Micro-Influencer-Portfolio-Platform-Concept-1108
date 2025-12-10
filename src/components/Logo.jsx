import React from 'react';

const Logo = ({ size = 40, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background with Gradient */}
      <rect width="100" height="100" rx="20" fill="url(#logoGradient)"/>
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* "IH" Text */}
      <text 
        x="50" 
        y="68" 
        fontFamily="Arial, sans-serif" 
        fontSize="48" 
        fontWeight="bold" 
        fill="white" 
        textAnchor="middle"
      >
        IH
      </text>
      
      {/* Small bridge icon above the letters */}
      <path 
        d="M 35 30 Q 50 20 65 30" 
        stroke="white" 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round"
      />
      <circle cx="35" cy="30" r="2.5" fill="white"/>
      <circle cx="65" cy="30" r="2.5" fill="white"/>
    </svg>
  );
};

export default Logo;

