import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};