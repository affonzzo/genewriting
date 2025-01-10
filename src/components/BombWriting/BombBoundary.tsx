import React from 'react';

export function BombBoundary() {
  return (
    <div className="relative w-full h-8">
      {/* Main laser beam */}
      <div className="absolute -left-12 -right-12 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse">
        {/* Primary glow */}
        <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent blur-sm" />
        {/* Secondary glow */}
        <div className="absolute inset-0 h-[4px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent blur-md" />
        {/* Outer glow */}
        <div className="absolute inset-0 h-[6px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent blur-lg" />
        
        {/* High-tech particles */}
        <div className="absolute -top-2 left-1/2 w-1 h-4 bg-red-500/80 blur-[1px] animate-ping" />
        <div className="absolute -top-1 left-1/3 w-0.5 h-2 bg-red-500/60 blur-[0.5px] animate-pulse delay-75" />
        <div className="absolute -top-1 right-1/3 w-0.5 h-2 bg-red-500/60 blur-[0.5px] animate-pulse delay-150" />
        
        {/* Digital glitch effects */}
        <div className="absolute top-0 left-[20%] w-12 h-[1px] bg-red-400/90 animate-[glitch_2s_infinite]" />
        <div className="absolute top-0 right-[20%] w-12 h-[1px] bg-red-400/90 animate-[glitch_2s_infinite_250ms]" />
      </div>

      {/* Digital noise overlay */}
      <div className="absolute inset-0 mix-blend-overlay opacity-20">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZjAwMDAiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] animate-noise" />
      </div>
    </div>
  );
}