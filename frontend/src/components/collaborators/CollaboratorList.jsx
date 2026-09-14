import React from 'react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

export default function CollaboratorList({ collaborators, currentUserId, isOwner, onRemove }) {
  if (collaborators.length === 0) {
    return <p className="text-sm text-ink-faint italic py-6">No one else has been invited yet.</p>;
  }

  return (
    <div className="divide-y divide-cream-deep">
      {collaborators.map((c) => (
        <div key={c.id} className="flex items-center gap-3 py-3.5">
          <Avatar name={c.user.fullName} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-ink truncate">{c.user.fullName}</p>
            <p className="data-mono truncate">{c.user.email}</p>
          </div>
          <span className="data-mono uppercase tracking-wide font-bold">{c.role.toLowerCase()}</span>
          <Badge tone={c.accepted ? 'COMPLETED' : 'PLANNING'}>
            {c.accepted ? 'joined' : 'pending'}
          </Badge>
          {isOwner && c.user.id !== currentUserId && (
            <button
              onClick={() => onRemove(c.user.id)}
              className="text-xs font-bold text-coral-deep hover:underline ml-2"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}