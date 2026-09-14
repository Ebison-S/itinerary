import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export default function PackingItemRow({ item, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 py-2.5 group">
      <button
        onClick={() => onToggle(item)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all',
          item.isPacked ? 'bg-coral border-coral' : 'border-cream-deep hover:border-coral'
        )}
        aria-label={item.isPacked ? 'Mark as not packed' : 'Mark as packed'}
      >
        {item.isPacked && <Check className="w-3.5 h-3.5 text-cream-paper" strokeWidth={3} />}
      </button>

      <span className={clsx('flex-1 text-sm font-medium', item.isPacked ? 'line-through text-ink-faint' : 'text-ink')}>
        {item.itemName}
        {item.quantity > 1 && <span className="data-mono ml-1.5">×{item.quantity}</span>}
      </span>

      <button
        onClick={() => onDelete(item)}
        className="opacity-0 group-hover:opacity-100 text-ink-faint hover:text-coral-deep transition-opacity text-xs font-bold"
        aria-label="Remove"
      >
        Remove
      </button>
    </div>
  );
}