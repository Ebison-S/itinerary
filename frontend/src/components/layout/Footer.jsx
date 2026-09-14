import React from 'react';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-6 sm:px-10 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-8">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-coral" strokeWidth={2.25} />
          <span className="font-display text-lg font-bold">Waypoint</span>
        </div>
        <p className="data-mono">Built for the next trip.</p>
      </div>
    </footer>
  );
}