import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-coral-soft flex items-center justify-center mb-6 animate-float">
        <Compass className="w-8 h-8 text-coral-deep" strokeWidth={1.75} />
      </div>
      <h1 className="font-display text-display-md font-bold mb-2">Off the map</h1>
      <p className="text-sm text-ink-soft mb-7 max-w-xs">
        This page isn't on the route. Let's get you back to known ground.
      </p>
      <Link to="/dashboard" className="btn-primary">
        Back to your trips
      </Link>
    </div>
  );
}