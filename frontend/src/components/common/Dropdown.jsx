import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({ label, error, options, className, id, ...props }) {
  const selectId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-bold text-ink pl-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className="input-field appearance-none cursor-pointer pr-10"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-ink-faint absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-coral-deep font-medium pl-1">{error}</p>}
    </div>
  );
}