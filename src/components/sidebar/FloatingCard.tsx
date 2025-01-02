import React from 'react';

interface FloatingCardProps {
  children: React.ReactNode;
}

export function FloatingCard({ children }: FloatingCardProps) {
  return (
    <div className="bg-white dark:bg-luxury-800/95 rounded-xl shadow-lg border border-gray-100 dark:border-luxury-600 backdrop-blur-sm w-[240px]">
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}