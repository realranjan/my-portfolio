import React from 'react';

const EasterEggTracker = ({ total, found }) => (
  <div className="fixed bottom-6 right-6 z-50 bg-white/90 border border-orb-red rounded-lg px-4 py-2 shadow-lg text-sm font-medium text-gray-900 flex items-center gap-2 animate-fadeIn">
    <span role="img" aria-label="egg">🥚</span>
    <span>Easter Eggs: {found} / {total} found</span>
  </div>
);

export default EasterEggTracker; 