import React from 'react';
import clsx from 'clsx';

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex bg-cream-deep rounded-pill p-1.5 gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            'px-4 py-2 rounded-pill text-sm font-bold transition-all',
            active === tab.value
              ? 'bg-coral text-cream-paper shadow-coral-sm'
              : 'text-ink-soft hover:text-ink'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}