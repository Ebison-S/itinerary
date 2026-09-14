import React from 'react';
import { Calendar, MapPin, Wallet, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyHelpers';

export default function TripStatsBar({ trip, budgetSummary, dayCount }) {
  const stats = [
    { label: 'Duration', value: `${dayCount} day${dayCount === 1 ? '' : 's'}`, icon: Calendar, tone: 'bg-coral-soft text-coral-deep' },
    { label: 'Stops', value: trip.destinations?.length || 0, icon: MapPin, tone: 'bg-gold-soft text-ink' },
    {
      label: 'Budget',
      value: budgetSummary ? formatCurrency(budgetSummary.totalBudget, budgetSummary.currency) : '—',
      icon: Wallet,
      tone: 'bg-teal-soft text-teal',
    },
    {
      label: 'Spent',
      value: budgetSummary ? formatCurrency(budgetSummary.totalSpent, budgetSummary.currency) : '—',
      icon: TrendingDown,
      tone: 'bg-cream-deep text-ink-soft',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="card px-5 py-5">
          <div className={`w-8 h-8 rounded-full ${s.tone} flex items-center justify-center mb-3`}>
            <s.icon className="w-4 h-4" strokeWidth={2} />
          </div>
          <p className="data-mono mb-1">{s.label}</p>
          <p className="font-display text-2xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}