import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, MapPinned, ListChecks, Trash2, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTrips, deleteTrip, selectAllTrips, selectTripsListStatus } from '../features/trips/tripsSlice';
import { useAuth } from '../hooks/useAuth';
import TripCard from '../components/trip/TripCard';
import EmptyState from '../components/common/EmptyState';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(selectAllTrips);
  const status = useAppSelector(selectTripsListStatus);
  const { user } = useAuth();

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const upcoming = useMemo(
    () => trips.filter((t) => t.status !== 'COMPLETED' && t.status !== 'CANCELLED'),
    [trips]
  );
  const past = useMemo(
    () => trips.filter((t) => t.status === 'COMPLETED' || t.status === 'CANCELLED'),
    [trips]
  );

  const exitSelectMode = () => {
    setSelectMode(false);
    setSelectedIds(new Set());
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected = trips.length > 0 && selectedIds.size === trips.length;
  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(trips.map((t) => t.id)));
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    const ids = Array.from(selectedIds);
    const results = await Promise.all(ids.map((id) => dispatch(deleteTrip(id))));
    setDeleting(false);
    setConfirmOpen(false);

    const failed = results.filter((r) => r.meta.requestStatus !== 'fulfilled').length;
    const succeeded = ids.length - failed;

    if (succeeded > 0) toast.success(`${succeeded} trip${succeeded === 1 ? '' : 's'} deleted`);
    if (failed > 0) toast.error(`Couldn't delete ${failed} trip${failed === 1 ? '' : 's'}`);

    exitSelectMode();
  };

  return (
    <div>
      <header className="mb-9 pt-2">
        {!selectMode ? (
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-display-md font-bold">
                {greeting()}, {user?.fullName?.split(' ')[0]}
              </h1>
              <p className="text-sm text-ink-soft mt-1.5">
                {trips.length === 0 ? 'No trips yet' : `${upcoming.length} trip${upcoming.length === 1 ? '' : 's'} in motion`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {trips.length > 0 && (
                <button onClick={() => setSelectMode(true)} className="btn-ghost text-sm">
                  <ListChecks className="w-4 h-4" strokeWidth={2} />
                  Select
                </button>
              )}
              <Link to="/trips/new" className="btn-primary">
                <Plus className="w-4 h-4" strokeWidth={2.25} />
                Plan a trip
              </Link>
            </div>
          </div>
        ) : (
          <div className="tile p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-ink">
                {selectedIds.size} selected
              </span>
              <button onClick={toggleSelectAll} className="text-sm font-bold text-coral hover:underline">
                {allSelected ? 'Deselect all' : 'Select all'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="!py-2 !px-4 text-sm !text-coral-deep hover:!border-coral-deep"
                disabled={selectedIds.size === 0}
                onClick={() => setConfirmOpen(true)}
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                Delete selected
              </Button>
              <button onClick={exitSelectMode} className="btn-ghost text-sm">
                <X className="w-3.5 h-3.5" strokeWidth={2.25} />
                Cancel
              </button>
            </div>
          </div>
        )}
      </header>

      {status === 'loading' && trips.length === 0 ? (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      ) : trips.length === 0 ? (
        <EmptyState
          icon={MapPinned}
          title="Your map is empty"
          description="Start with the dates and a destination — you can fill in the route as plans firm up."
          action={
            <Link to="/trips/new">
              <Button>Plan your first trip</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-12">
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-ink-soft uppercase tracking-wide mb-4">Upcoming & in planning</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {upcoming.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    selectable={selectMode}
                    selected={selectedIds.has(trip.id)}
                    onToggleSelect={toggleSelect}
                  />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-ink-soft uppercase tracking-wide mb-4">Past trips</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {past.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    selectable={selectMode}
                    selected={selectedIds.has(trip.id)}
                    onToggleSelect={toggleSelect}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <Modal
        open={confirmOpen}
        onClose={() => !deleting && setConfirmOpen(false)}
        title={`Delete ${selectedIds.size} trip${selectedIds.size === 1 ? '' : 's'}?`}
      >
        <p className="text-sm text-ink-soft mb-6">
          This can't be undone — the itinerary, budget, and packing list for
          {selectedIds.size === 1 ? ' this trip' : ' these trips'} will be permanently removed.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setConfirmOpen(false)} disabled={deleting}>
            Keep {selectedIds.size === 1 ? 'it' : 'them'}
          </Button>
          <Button
            className="flex-1 !bg-coral-deep hover:!bg-coral-deep/90"
            loading={deleting}
            onClick={handleConfirmDelete}
          >
            <Trash2 className="w-4 h-4" strokeWidth={2} />
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}