import React from 'react';
import PackingItemRow from './PackingItemRow';

export default function PackingListGroup({ category, items, onToggle, onDelete }) {
  const packedCount = items.filter((i) => i.isPacked).length;
  const allPacked = packedCount === items.length;

  return (
    <div className="card p-5">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-display text-base font-bold">{category}</h3>
        <span className={`data-mono font-bold ${allPacked ? 'text-teal' : ''}`}>
          {packedCount}/{items.length}
        </span>
      </div>
      <div className="divide-y divide-cream-deep">
        {items.map((item) => (
          <PackingItemRow key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}