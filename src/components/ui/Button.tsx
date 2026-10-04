import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-medium rounded transition-colors select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizes = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-11 px-5 text-base gap-2.5',
  };

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary border border-transparent',
    secondary: 'bg-subtle text-dark hover:bg-border/50 border border-border focus-visible:outline-muted',
    outline: 'bg-white text-dark hover:bg-subtle border border-border focus-visible:outline-primary',
    ghost: 'bg-transparent text-body hover:bg-subtle hover:text-dark focus-visible:outline-primary',
    success: 'bg-success text-white hover:bg-success/90 focus-visible:outline-success border border-transparent',
    danger: 'bg-danger text-white hover:bg-danger/90 focus-visible:outline-danger border border-transparent',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
