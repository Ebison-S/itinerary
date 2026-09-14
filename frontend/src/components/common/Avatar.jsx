import React from 'react';
import clsx from 'clsx';

const PALETTE = ['bg-coral text-cream-paper', 'bg-gold text-ink', 'bg-teal text-cream-paper', 'bg-ink text-cream-paper'];

function paletteFor(name) {
  const code = (name?.charCodeAt(0) || 0) % PALETTE.length;
  return PALETTE[code];
}

export default function Avatar({ name, size = 'md', className }) {
  const initial = name?.[0]?.toUpperCase() || '?';
  const sizes = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };
  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-bold shrink-0',
        paletteFor(name),
        sizes[size],
        className
      )}
    >
      {initial}
    </div>
  );
}