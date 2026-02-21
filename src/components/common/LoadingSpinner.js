import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'default', text = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`animate-spin text-primary-500 ${sizeClasses[size]}`} />
      {text && <p className="text-gray-500 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
