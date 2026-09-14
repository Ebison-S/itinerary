import React from 'react';
import Badge from '../common/Badge';
import { formatDateRange } from '../../utils/dateHelpers';

export default function TripHero({ trip }) {
  const hasCover = Boolean(trip.coverImageUrl);

  return (
    <div className="relative rounded-tile overflow-hidden h-64 sm:h-72 mb-8">
      {hasCover ? (
        <img
          src={trip.coverImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-coral via-coral to-gold">
          <svg viewBox="0 0 600 260" className="w-full h-full opacity-40" preserveAspectRatio="xMidYMid slice">
            <path
              d="M 10 220 C 90 170, 60 110, 160 120 S 320 190, 360 100 S 480 40, 590 60"
              fill="none"
              stroke="#FBF6EF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {[
              [10, 220],
              [160, 120],
              [360, 100],
              [590, 60],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={6} fill="#FBF6EF" />
            ))}
          </svg>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
        <div className="flex items-center gap-2 mb-3">
          <Badge tone={trip.status}>{trip.status.toLowerCase()}</Badge>
          <span className="data-mono text-cream-paper/80">
            {formatDateRange(trip.startDate, trip.endDate)}
          </span>
        </div>
        <h1 className="font-display text-display-md sm:text-display-lg font-bold text-cream-paper">
          {trip.title}
        </h1>
      </div>
    </div>
  );
}