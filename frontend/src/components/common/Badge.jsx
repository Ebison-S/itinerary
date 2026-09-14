import React from 'react';
import clsx from 'clsx';

const TONE_CLASS = {
  PLANNING: 'badge-gold',
  UPCOMING: 'badge-coral',
  ONGOING: 'badge-coral',
  COMPLETED: 'badge-teal',
  CANCELLED: 'badge-muted',
};

export default function Badge({ children, tone, className }) {
  const toneClass = TONE_CLASS[tone] || 'badge-muted';
  return <span className={clsx(toneClass, className)}>{children}</span>;
}