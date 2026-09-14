import React, { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import TimelineItemCard from './TimelineItemCard';
import { formatDateShort } from '../../utils/dateHelpers';

export default function DayTimeline({ day, onReorder, onAddItem, onEditItem, onDeleteItem }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const items = day.items;

  const lineHeight = useMemo(() => Math.max(items.length * 100, 24), [items.length]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    onReorder(day.id, reordered.map((i) => i.id));
  };

  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <h3 className="font-display text-xl font-bold">
            Day {day.dayNumber}
            {day.title && <span className="text-ink-soft font-medium"> — {day.title}</span>}
          </h3>
          <p className="data-mono mt-0.5">{formatDateShort(day.date)}</p>
        </div>
        <button onClick={() => onAddItem(day)} className="btn-ghost text-sm shrink-0">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
          Add to this day
        </button>
      </div>

      <div className="relative">
        {items.length > 0 && (
          <svg
            className="absolute left-5 top-5 -z-0"
            width="2.5"
            height={lineHeight}
            style={{ overflow: 'visible' }}
          >
            <line x1="1.25" y1="0" x2="1.25" y2={lineHeight} className="route-line" />
          </svg>
        )}

        {items.length === 0 ? (
          <p className="pl-12 text-sm text-ink-faint italic py-4">Nothing planned yet for this day.</p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3 relative z-10">
                {items.map((item) => (
                  <TimelineItemCard
                    key={item.id}
                    item={item}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}