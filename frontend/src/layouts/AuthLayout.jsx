import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream">
      <div className="flex flex-col justify-center px-8 sm:px-16 py-12">
        <Link to="/" className="mb-12 inline-flex items-center gap-2 w-fit">
          <Compass className="w-6 h-6 text-coral" strokeWidth={2.25} />
          <span className="font-display text-2xl font-bold">Waypoint</span>
        </Link>
        <div className="max-w-sm w-full">
          <Outlet />
        </div>
      </div>

      <div className="hidden lg:flex relative items-center justify-center bg-coral overflow-hidden rounded-l-[3rem] m-4">
        <svg viewBox="0 0 400 500" className="w-3/4 opacity-90" aria-hidden="true">
          <path
            d="M 60 460 C 120 380, 40 300, 110 220 S 260 140, 220 60"
            fill="none"
            stroke="#FBF6EF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1000"
            className="animate-draw-route"
          />
          {[
            [60, 460],
            [110, 220],
            [220, 60],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={7} fill="#FBF6EF" />
          ))}
        </svg>
        <p className="absolute bottom-16 left-12 right-12 font-display text-display-md font-bold text-cream-paper leading-tight">
          Plan the route.
          <br />
          Not just the dates.
        </p>
      </div>
    </div>
  );
}