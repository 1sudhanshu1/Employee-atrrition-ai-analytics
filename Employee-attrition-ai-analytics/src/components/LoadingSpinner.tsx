import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Analyzing workforce factors...' }: LoadingSpinnerProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center p-8 text-center"
      id="loading-spinner-container"
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-900/40" />
        {/* Spinning indicator */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent dark:border-indigo-400 dark:border-t-transparent" />
      </div>
      {message && (
        <p 
          className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse"
          id="loading-spinner-message"
        >
          {message}
        </p>
      )}
    </div>
  );
}
