import React from 'react';

interface ToolbarSectionProps {
  children: React.ReactNode;
  showDivider?: boolean;
}

export function ToolbarSection({ children, showDivider = true }: ToolbarSectionProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-1">{children}</div>
      {showDivider && <div className="h-px bg-gray-200 dark:bg-luxury-600 my-1" />}
    </>
  );
}