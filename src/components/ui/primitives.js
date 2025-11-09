import React from 'react';
import { Loader2 } from 'lucide-react';

export const PyramidLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L2 22h20L12 2z" />
    <path d="M12 8L6 18h12L12 8z" opacity="0.6" />
  </svg>
);

export const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  onClick,
  className = '',
  ...props
}) => {
  const variants = {
    primary:
      'bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black hover:text-black shadow-md ring-1 ring-yellow-300/30',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-md ring-1 ring-green-300/30',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md ring-1 ring-red-300/30',
    ghost:
      'bg-white/5 hover:bg-white/10 text-gray-300 ring-1 ring-white/10 backdrop-blur-sm',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white/5 [@supports(backdrop-filter:blur(0px))]:backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg shadow-black/30 ${className}`}>
    {children}
  </div>
);

export const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled,
  helperText,
  ...props
}) => (
  <div>
    {label && <label className="text-sm text-gray-400 mb-2 block">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/30 disabled:opacity-50 backdrop-blur-sm"
      {...props}
    />
    {helperText && <div className="text-xs text-gray-400 mt-1">{helperText}</div>}
  </div>
);
