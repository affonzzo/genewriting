import React from 'react';

export function BombBoundary() {
  return (
    <div className="relative w-full">
      {/* Main laser line */}
      <div className="absolute -left-12 -right-12 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent">
        {/* Glow effect */}
        <div className="absolute inset-0 h-[3px] bg-red-500/20 blur-sm" />
        
        {/* Animated particles */}
        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        <div className="absolute -top-1 left-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        <div className="absolute -top-1 right-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" />
      </div>

      {/* Warning stripes */}
      <div className="absolute -left-12 -right-12 h-6 -top-6">
        <div className="w-full h-full bg-gradient-to-r from-red-500/5 via-red-500/10 to-red-500/5" />
      </div>
    </div>
  );
}