import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  className = '' 
}) => {
  return (
    <button 
      className={`btn ${variant} ${size} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;