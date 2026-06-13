import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  dark?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, dark = false, className = '', ...props }) => {
  const baseClasses = 'rounded-[var(--radius-card)] p-6 md:px-6 md:py-8 fast-transition';
  const colorClasses = dark ? 'bg-background-dark text-white' : 'bg-background-alt text-text';
  
  return (
    <div className={`${baseClasses} ${colorClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
