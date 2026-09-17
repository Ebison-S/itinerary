import React, { useEffect, useMemo, useRef } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

/**
 * Collapses consecutive identical messages into one line with a repeat
 * count (e.g. "Calculating travel routes and distances... ×4") instead
 * of printing the same line over and over -- agents sometimes re-emit
 * the same progress message across multiple tool calls, and without
 * this the log reads as broken/looping rather than just chatty.
 */
function collapseConsecutive(messages) {
  const collapsed = [];
  for (const message of messages) {
    const last = collapsed[collapsed.length - 1];
    if (last && last.message === message) {
      last.count += 1;
    } else {
      collapsed.push({ message, count: 1 });
    }
  }
  return collapsed;
}

export default function AiPlanProgress({ messages, streaming }) {
  const bottomRef = useRef(null);
  const collapsed = useMemo(() => collapseConsecutive(messages), [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [collapsed.length]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-coral">
        <Sparkles className="w-4 h-4" strokeWidth={2} />
        <p className="text-sm font-bold">
          {streaming ? 'Planning your trip…' : 'Done thinking'}
        </p>
      </div>

      <div className="max-h-72 overflow-y-auto scroll-themed space-y-2.5 pr-2">
        {collapsed.length === 0 && (
          <p className="text-sm text-ink-faint italic">Getting started…</p>
        )}

        {collapsed.map((entry, i) => {
          const isLast = i === collapsed.length - 1;
          const isActive = streaming && isLast;
          return (
            <div key={i} className="flex items-start gap-2.5 animate-rise-in">
              {isActive ? (
                <Loader2 className="w-4 h-4 text-coral animate-spin shrink-0 mt-0.5" strokeWidth={2.25} />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={2.25} />
              )}
              <span className={`text-sm ${isActive ? 'text-ink font-medium' : 'text-ink-soft'}`}>
                {entry.message}
                {entry.count > 1 && (
                  <span className="data-mono ml-1.5 text-ink-faint">×{entry.count}</span>
                )}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}