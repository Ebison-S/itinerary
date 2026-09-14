import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <div className="sticky top-4 z-40 px-4 sm:px-6 mb-4">
        <header className="nav-pill max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-coral" strokeWidth={2.25} />
            <span className="font-display text-lg font-bold">Waypoint</span>
          </div>
          <nav className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary !py-2.5 !px-5 text-sm">
                Open trips
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm font-bold">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary !py-2.5 !px-5 text-sm">
                  Start planning
                </Link>
              </>
            )}
          </nav>
        </header>
      </div>

      <main className="flex-1 flex items-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-16">
          <div>
            <h1 className="font-display text-display-lg sm:text-display-xl font-bold mb-6">
              Every trip
              <br />
              has a <span className="text-coral">route.</span>
            </h1>
            <p className="text-lg text-ink-soft max-w-md mb-9 leading-relaxed">
              Waypoint lays your itinerary out as a path, not a spreadsheet —
              flights, stays, and plans connected day by day, with a shared
              budget and packing list along the way.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/register" className="btn-primary">
                Plan your first trip
              </Link>
              <Link to="/login" className="text-sm font-bold text-ink-soft hover:text-coral transition-colors">
                I already have an account
              </Link>
            </div>
          </div>

          <div className="relative tile p-8 bg-gradient-to-br from-coral-soft to-gold-soft">
            <svg viewBox="0 0 420 420" className="w-full" aria-hidden="true">
              <path
                d="M 30 380 C 100 320, 40 250, 130 220 S 250 280, 260 180 S 180 60, 300 30"
                fill="none"
                stroke="#E14F30"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="1000"
                className="animate-draw-route"
              />
              {[
                { x: 30, y: 380, label: 'Depart' },
                { x: 130, y: 220, label: 'Layover' },
                { x: 260, y: 180, label: 'Stay' },
                { x: 300, y: 30, label: 'Arrive' },
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={8} fill="#FF6B4A" />
                  <text
                    x={p.x + 16}
                    y={p.y + 5}
                    fill="#201C1D"
                    style={{ font: 'bold 12px "JetBrains Mono", monospace' }}
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}