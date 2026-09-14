import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useTripId } from '../hooks/useTripId';
import { fetchTrip, selectCurrentTrip, selectTripDetailStatus, clearCurrentTrip } from '../features/trips/tripsSlice';
import Navbar from '../components/layout/Navbar';
import Spinner from '../components/common/Spinner';
import { formatDateRange } from '../utils/dateHelpers';
import clsx from 'clsx';

const TABS = [
  { to: '', label: 'Overview', end: true },
  { to: 'itinerary', label: 'Itinerary' },
  { to: 'budget', label: 'Budget' },
  { to: 'packing', label: 'Packing' },
  { to: 'collaborators', label: 'Collaborators' },
];

export default function TripLayout() {
  const dispatch = useAppDispatch();
  const tripId = useTripId();
  const trip = useAppSelector(selectCurrentTrip);
  const status = useAppSelector(selectTripDetailStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (tripId) dispatch(fetchTrip(tripId));
    return () => dispatch(clearCurrentTrip());
  }, [tripId, dispatch]);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="px-4 sm:px-6 pb-16 max-w-6xl w-full mx-auto">
        {status === 'loading' && !trip ? (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        ) : status === 'failed' ? (
          <div className="tile p-10 text-center">
            <MapPin className="w-8 h-8 text-ink-faint mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-display text-xl font-bold mb-2">This trip isn't reachable</p>
            <p className="text-sm text-ink-soft mb-5">
              It may have been removed, or you may not have access.
            </p>
            <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
              Back to dashboard
            </button>
          </div>
        ) : trip ? (
          <>
            <header className="mb-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-ghost text-xs mb-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                all trips
              </button>
              <h1 className="font-display text-display-md font-bold">{trip.title}</h1>
              <p className="data-mono mt-2">{formatDateRange(trip.startDate, trip.endDate)}</p>
            </header>

            <nav className="inline-flex flex-wrap bg-cream-deep rounded-pill p-1.5 gap-1 mb-8">
              {TABS.map((tab) => (
                <NavLink
                  key={tab.label}
                  to={tab.to}
                  end={tab.end}
                  className={({ isActive }) =>
                    clsx(
                      'px-4 py-2 rounded-pill text-sm font-bold whitespace-nowrap transition-all',
                      isActive
                        ? 'bg-coral text-cream-paper shadow-coral-sm'
                        : 'text-ink-soft hover:text-ink'
                    )
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </nav>

            <Outlet />
          </>
        ) : null}
      </main>
    </div>
  );
}