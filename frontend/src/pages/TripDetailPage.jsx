import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Route } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useTripId } from '../hooks/useTripId';
import { selectCurrentTrip } from '../features/trips/tripsSlice';
import { fetchBudget, selectBudgetSummary } from '../features/budget/budgetSlice';
import { fetchItinerary, selectItineraryDays } from '../features/itinerary/itinerarySlice';
import TripHero from '../components/trip/TripHero';
import TripStatsBar from '../components/trip/TripStatsBar';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

export default function TripDetailPage() {
  const dispatch = useAppDispatch();
  const tripId = useTripId();
  const trip = useAppSelector(selectCurrentTrip);
  const budgetSummary = useAppSelector(selectBudgetSummary);
  const days = useAppSelector(selectItineraryDays);

  useEffect(() => {
    if (tripId) {
      dispatch(fetchBudget(tripId));
      dispatch(fetchItinerary(tripId));
    }
  }, [tripId, dispatch]);

  if (!trip) return null;

  return (
    <div>
      <TripHero trip={trip} />

      <div className="space-y-8">
        <TripStatsBar trip={trip} budgetSummary={budgetSummary} dayCount={days.length} />

        {trip.description && (
          <div className="tile p-7">
            <h2 className="text-sm font-bold text-ink-soft uppercase tracking-wide mb-2.5">About this trip</h2>
            <p className="text-ink leading-relaxed">{trip.description}</p>
          </div>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-ink-soft uppercase tracking-wide">Route so far</h2>
            <Link
              to={`/trips/${tripId}/itinerary`}
              className="text-sm font-bold text-coral hover:text-coral-deep hover:underline flex items-center gap-1"
            >
              Open itinerary builder
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
            </Link>
          </div>

          {days.length === 0 ? (
            <EmptyState
              icon={Route}
              title="No days planned yet"
              description="Add your first stop and Waypoint will lay out the route as you go."
              action={
                <Link to={`/trips/${tripId}/itinerary`}>
                  <Button>Start the itinerary</Button>
                </Link>
              }
            />
          ) : (
            <div className="tile p-7 grid sm:grid-cols-3 gap-5">
              {days.slice(0, 6).map((day) => (
                <div key={day.id} className="border-l-4 border-coral pl-4">
                  <p className="data-mono mb-0.5">Day {day.dayNumber}</p>
                  <p className="font-bold text-sm truncate">
                    {day.title || `${day.items.length} planned`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}