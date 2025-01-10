import React from 'react';

interface PaperProps {
  children: React.ReactNode;
}

export function Paper({ children }: PaperProps) {
  return (
    <div className="flex-1 flex justify-center items-start px-8 py-4 bg-paper-light dark:bg-paper-dark">
      <div className="relative w-full max-w-[650px] min-h-[calc(100vh-4rem)] bg-white dark:bg-luxury-800 rounded-lg shadow-[0_2px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_32px_rgba(0,0,0,0.2)]">
        {children}
      </div>
    </div>
  );
}