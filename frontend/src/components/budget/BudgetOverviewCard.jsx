import React from 'react';
import clsx from 'clsx';
import { Pencil } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyHelpers';

export default function BudgetOverviewCard({ summary, onEditBudget }) {
  const pct = Math.min(summary.percentUsed, 100);
  const over = summary.percentUsed > 100;

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="data-mono mb-1">Total budget</p>
          <p className="font-display text-4xl font-bold">{formatCurrency(summary.totalBudget, summary.currency)}</p>
        </div>
        <button onClick={onEditBudget} className="btn-ghost text-sm">
          <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
          Edit
        </button>
      </div>

      <div className="h-3 bg-cream-deep rounded-pill overflow-hidden mb-3">
        <div
          className={clsx('h-full rounded-pill transition-all duration-500', over ? 'bg-coral-deep' : 'bg-coral')}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className={clsx('data-mono font-bold', over && 'text-coral-deep')}>
          {formatCurrency(summary.totalSpent, summary.currency)} spent
        </span>
        <span className="data-mono">
          {over ? 'over by ' : ''}
          {formatCurrency(Math.abs(summary.remaining), summary.currency)}
          {!over && ' left'}
        </span>
      </div>
    </div>
  );
}