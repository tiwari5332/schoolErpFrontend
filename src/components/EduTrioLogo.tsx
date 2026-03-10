import React from 'react';

interface EduTrioLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function EduTrioLogo({ className = '', size = 'md' }: EduTrioLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f9ff" />
          </linearGradient>
          
          {/* Shadow Filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#6366f1" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Main Circle Background */}
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="url(#logoGradient)"
          filter="url(#shadow)"
        />
        
        {/* Three Education Elements representing "Trio" */}
        {/* Book 1 */}
        <g transform="translate(25, 35)">
          <rect x="0" y="8" width="20" height="24" rx="2" fill="url(#textGradient)" opacity="0.9"/>
          <rect x="2" y="10" width="16" height="2" fill="#6366f1" opacity="0.3"/>
          <rect x="2" y="14" width="12" height="1" fill="#6366f1" opacity="0.3"/>
          <rect x="2" y="17" width="14" height="1" fill="#6366f1" opacity="0.3"/>
          <rect x="2" y="20" width="10" height="1" fill="#6366f1" opacity="0.3"/>
        </g>
        
        {/* Graduation Cap */}
        <g transform="translate(45, 30)">
          <path
            d="M15 8 L5 12 L15 16 L25 12 L15 8 Z"
            fill="url(#textGradient)"
          />
          <path
            d="M8 13 L8 18 C8 20 11 22 15 22 C19 22 22 20 22 18 L22 13"
            stroke="url(#textGradient)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="24" cy="13" r="2" fill="#f59e0b"/>
        </g>
        
        {/* Book 2 */}
        <g transform="translate(75, 35)">
          <rect x="0" y="8" width="20" height="24" rx="2" fill="url(#textGradient)" opacity="0.9"/>
          <rect x="2" y="10" width="16" height="2" fill="#6366f1" opacity="0.3"/>
          <rect x="2" y="14" width="12" height="1" fill="#6366f1" opacity="0.3"/>
          <rect x="2" y="17" width="14" height="1" fill="#6366f1" opacity="0.3"/>
          <rect x="2" y="20" width="10" height="1" fill="#6366f1" opacity="0.3"/>
        </g>
        
        {/* EduTrio Text */}
        <text
          x="60"
          y="80"
          textAnchor="middle"
          fill="url(#textGradient)"
          fontSize="16"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          EduTrio
        </text>
        
        {/* Connecting Lines representing collaboration */}
        <path
          d="M35 47 Q60 42 85 47"
          stroke="url(#textGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        
        {/* Three dots representing the trio concept */}
        <circle cx="35" cy="70" r="2" fill="#10b981" opacity="0.8"/>
        <circle cx="60" cy="70" r="2" fill="#f59e0b" opacity="0.8"/>
        <circle cx="85" cy="70" r="2" fill="#ef4444" opacity="0.8"/>
      </svg>
    </div>
  );
}

// Simplified version for smaller contexts
export function EduTrioLogoSimple({ className = '', size = 'md' }: EduTrioLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="simpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        
        {/* Main Circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="url(#simpleGradient)"
        />
        
        {/* Simple "E" design */}
        <path
          d="M12 12 L12 28 M12 12 L24 12 M12 20 L20 20 M12 28 L24 28"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Three dots for "trio" */}
        <circle cx="26" cy="14" r="1.5" fill="#10b981"/>
        <circle cx="26" cy="20" r="1.5" fill="#f59e0b"/>
        <circle cx="26" cy="26" r="1.5" fill="#ef4444"/>
      </svg>
    </div>
  );
}