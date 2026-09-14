import React from 'react';
import { Compass } from 'lucide-react';

export default function EmptyState({ title, description, action, icon: Icon = Compass }) {
  return (
    <div className="tile p-14 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-coral-soft flex items-center justify-center mb-5 animate-float">
        <Icon className="w-8 h-8 text-coral-deep" strokeWidth={1.75} />
      </div>
      <h3 className="font-display text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-ink-soft max-w-xs mb-6">{description}</p>
      {action}
    </div>
  );
}