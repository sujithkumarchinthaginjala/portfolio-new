import React from 'react';

interface GridGuidelinesProps {
  showGuidelines?: boolean;
}

export const GridGuidelines: React.FC<GridGuidelinesProps> = ({ showGuidelines = true }) => {
  if (!showGuidelines) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-7xl mx-auto px-6 md:px-12">
      {/* Guideline 1 - Left margin alignment */}
      <div className="h-full w-px grid-guideline opacity-30" />
      {/* Guideline 2 - Left inner column */}
      <div className="h-full w-px grid-guideline opacity-30 hidden md:block" />
      {/* Guideline 3 - Right inner column */}
      <div className="h-full w-px grid-guideline opacity-30 hidden md:block" />
      {/* Guideline 4 - Right margin alignment */}
      <div className="h-full w-px grid-guideline opacity-30" />
    </div>
  );
};
