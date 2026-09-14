import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function AiPlanProgress({ messages, streaming }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-coral">
        <Sparkles className="w-4 h-4" strokeWidth={2} />
        <p className="text-sm font-bold">
          {streaming ? 'Planning your trip…' : 'Done thinking'}
        </p>
      </div>

      <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
        {messages.length === 0 && (
          <p className="text-sm text-ink-faint italic">Getting started…</p>
        )}

        {messages.map((message, i) => {
          const isLast = i === messages.length - 1;
          const isActive = streaming && isLast;
          return (
            <div key={i} className="flex items-start gap-2.5 animate-rise-in">
              {isActive ? (
                <Loader2 className="w-4 h-4 text-coral animate-spin shrink-0 mt-0.5" strokeWidth={2.25} />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={2.25} />
              )}
              <span className={`text-sm ${isActive ? 'text-ink font-medium' : 'text-ink-soft'}`}>
                {message}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}