import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  href,
  ...props 
}) => {
  const baseClasses = 'fast-transition inline-flex items-center justify-center font-medium rounded-[var(--radius-button-lg)]';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-hover px-6 py-3',
    ghost: 'bg-transparent text-white hover:opacity-80 px-3 py-2'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
