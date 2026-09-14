import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDateRange, tripDurationDays } from '../../utils/dateHelpers';

const FALLBACK_GRADIENTS = [
  'from-coral to-gold',
  'from-teal to-coral',
  'from-gold to-coral-deep',
];

function gradientFor(id) {
  return FALLBACK_GRADIENTS[id % FALLBACK_GRADIENTS.length];
}

export default function TripCard({ trip }) {
  const nights = tripDurationDays(trip.startDate, trip.endDate);
  const hasCover = Boolean(trip.coverImageUrl);

  return (
    <Link
      to={`/trips/${trip.id}`}
      className="tile tile-hover block overflow-hidden group"
    >
      <div className="relative h-36 overflow-hidden">
        {hasCover ? (
          <img src={trip.coverImageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientFor(trip.id)} relative`}>
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-30" preserveAspectRatio="xMidYMid slice">
              <path
                d="M -10 80 C 30 60, 20 30, 60 40 S 120 70, 150 20 S 190 10, 220 30"
                fill="none"
                stroke="#FBF6EF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge tone={trip.status}>{trip.status.toLowerCase()}</Badge>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream-paper/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4 text-ink" strokeWidth={2.25} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-bold mb-1.5 truncate">{trip.title}</h3>
        <p className="data-mono mb-4">{formatDateRange(trip.startDate, trip.endDate)}</p>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-cream-deep rounded-pill px-2.5 py-1 text-xs font-bold text-ink-soft">
            <MapPin className="w-3 h-3" strokeWidth={2.25} />
            {trip.destinationCount} {trip.destinationCount === 1 ? 'stop' : 'stops'}
          </span>
          <span className="inline-flex items-center gap-1 bg-cream-deep rounded-pill px-2.5 py-1 text-xs font-bold text-ink-soft">
            {nights} {nights === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>
    </Link>
  );
}