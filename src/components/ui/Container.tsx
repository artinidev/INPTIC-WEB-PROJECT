import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  small?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, small = false, className = '', ...props }) => {
  const maxWidthClass = small ? 'max-w-[800px]' : '';
  return (
    <div className={`c-container ${maxWidthClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
