import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '', ...props }) => {
  return (
    <span className={`inline-flex items-center rounded-full bg-[rgba(62,206,198,0.1)] px-3 py-1 text-sm font-medium text-primary fast-transition ${className}`} {...props}>
      {children}
    </span>
  );
};
