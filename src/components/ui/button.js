import React from 'react';

export default function Button({ children, onClick, type, variant = 'default' }) {
  const baseStyles = 'px-4 py-2 rounded font-medium';
  const variantStyles =
    variant === 'outline'
      ? 'border border-gray-500 text-gray-700 hover:bg-gray-100'
      : 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles}`}
    >
      {children}
    </button>
  );
}
