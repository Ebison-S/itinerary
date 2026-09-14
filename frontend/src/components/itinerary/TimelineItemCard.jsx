import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import {
  Plane, TrainFront, Bus, Car, BedDouble, LogOut as CheckoutIcon,
  Sparkles, UtensilsCrossed, Landmark, Users, Coffee, MoreHorizontal,
  GripVertical, Pencil, Trash2,
} from 'lucide-react';
import { formatTime } from '../../utils/dateHelpers';
import { formatCurrency } from '../../utils/currencyHelpers';
import { ITEM_TYPES } from '../../utils/constants';

const TYPE_ICON = {
  FLIGHT: Plane,
  TRAIN: TrainFront,
  BUS: Bus,
  CAR_RENTAL: Car,
  HOTEL_CHECKIN: BedDouble,
  HOTEL_CHECKOUT: CheckoutIcon,
  ACTIVITY: Sparkles,
  MEAL: UtensilsCrossed,
  SIGHTSEEING: Landmark,
  MEETING: Users,
  FREE_TIME: Coffee,
  OTHER: MoreHorizontal,
};

export default function TimelineItemCard({ item, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const typeLabel = ITEM_TYPES.find((t) => t.value === item.itemType)?.label || item.itemType;
  const Icon = TYPE_ICON[item.itemType] || MoreHorizontal;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx('relative pl-12 py-1 group', isDragging && 'opacity-50 z-10')}
    >
      <span className="absolute left-[15px] top-6 w-3.5 h-3.5 rounded-full bg-coral border-4 border-cream" />

      <div className="card p-4 flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-ink-faint hover:text-ink-soft mt-1 shrink-0"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" strokeWidth={2} />
        </button>

        <div className="w-9 h-9 rounded-full bg-coral-soft flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-coral-deep" strokeWidth={2} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold truncate text-ink">{item.title}</h4>
            <span className="data-mono uppercase tracking-wide">{typeLabel}</span>
          </div>
          {item.locationName && (
            <p className="text-sm text-ink-soft truncate">{item.locationName}</p>
          )}
          <div className="flex items-center gap-3 mt-1.5">
            {(item.startTime || item.endTime) && (
              <span className="data-mono">
                {formatTime(item.startTime)}
                {item.endTime && ` – ${formatTime(item.endTime)}`}
              </span>
            )}
            {item.cost && (
              <span className="data-mono text-gold font-bold">
                {formatCurrency(item.cost, item.currency)}
              </span>
            )}
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(item)}
            className="p-2 rounded-pill text-ink-faint hover:text-coral hover:bg-coral-soft"
            aria-label="Edit"
          >
            <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="p-2 rounded-pill text-ink-faint hover:text-coral-deep hover:bg-coral-soft"
            aria-label="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}