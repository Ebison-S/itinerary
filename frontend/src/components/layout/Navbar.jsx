import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Compass, MapPinned, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Trips', icon: MapPinned },
  { to: '/trips/new', label: 'New trip', icon: Plus },
];

/**
 * The single floating pill nav that replaces the old sidebar+topbar
 * pair. Sticky at the top of the viewport, full nav + branding + user
 * menu all in one bar, leaving the rest of the page as open canvas.
 */
export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-4 z-40 px-4 sm:px-6 mb-8">
      <nav className="nav-pill max-w-6xl mx-auto flex items-center justify-between gap-2 px-3 py-2">
        <NavLink to="/dashboard" className="flex items-center gap-2 pl-2 pr-3 shrink-0">
          <Compass className="w-5 h-5 text-coral" strokeWidth={2.25} />
          <span className="font-display text-lg font-bold hidden sm:inline">Waypoint</span>
        </NavLink>

        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-pill text-sm font-bold transition-all',
                  isActive
                    ? 'bg-coral text-cream-paper shadow-coral-sm'
                    : 'text-ink-soft hover:text-ink hover:bg-cream-deep'
                )
              }
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-10 h-10 rounded-full bg-gold-soft text-ink flex items-center justify-center text-sm font-bold hover:shadow-gold transition-shadow"
          >
            {user?.fullName?.[0]?.toUpperCase() || '?'}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 tile p-2 z-20 animate-rise-in">
              <div className="px-3 py-2 mb-1">
                <p className="text-sm font-bold text-ink truncate">{user?.fullName}</p>
                <p className="text-xs text-ink-faint truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut();
                  navigate('/');
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-bold rounded-card hover:bg-coral-soft hover:text-coral-deep transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" strokeWidth={2} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}