import React from 'react';

export default function Input({ label, error, hint, className, id, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-bold text-ink pl-1">
          {label}
        </label>
      )}
      <input id={inputId} className="input-field" {...props} />
      {hint && !error && <p className="text-xs text-ink-faint pl-1">{hint}</p>}
      {error && <p className="text-xs text-coral-deep font-medium pl-1">{error}</p>}
    </div>
  );
}