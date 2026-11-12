import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarEventType, CreateCalendarEventPayload } from '../../../types/dashboard';
import { useCreateCalendarEvent } from '../hooks/useDashboardQueries';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string; // "YYYY-MM-DD"
}

export function AddEventModal({ isOpen, onClose, defaultDate }: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CalendarEventType>('event');
  const [startDate, setStartDate] = useState(defaultDate || '2026-11-08');
  const [endDate, setEndDate] = useState(defaultDate || '2026-11-08');
  const [description, setDescription] = useState('');
  const [notify, setNotify] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createEventMutation = useCreateCalendarEvent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Event title is required');
      return;
    }

    if (endDate && new Date(endDate).getTime() < new Date(startDate).getTime()) {
      setError('End date cannot be earlier than start date');
      return;
    }

    const payload: CreateCalendarEventPayload = {
      title: title.trim(),
      type,
      startDate,
      endDate: endDate || undefined,
      description: description.trim() || undefined,
      notify,
    };

    createEventMutation.mutate(payload, {
      onSuccess: () => {
        setTitle('');
        setDescription('');
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-2xl p-6 border-0">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            Add New Calendar Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Event Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Science Exhibition, Annual Sports Day"
              className="h-10 text-xs rounded-xl"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Event Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CalendarEventType)}
              className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="event">Event / Activity</option>
              <option value="holiday">Official Holiday</option>
              <option value="exam">Examination</option>
              <option value="meeting">Meeting / PTM</option>
              <option value="weekly_off">Weekly Off</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Start Date *</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (new Date(endDate).getTime() < new Date(e.target.value).getTime()) {
                    setEndDate(e.target.value);
                  }
                }}
                className="h-10 text-xs rounded-xl"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Provide event details, venue or instructions..."
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            />
            <span className="text-xs text-slate-600">
              Notify parents, students, and staff via app alerts
            </span>
          </label>

          <DialogFooter className="mt-6 flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 px-4 text-xs rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createEventMutation.isPending}
              className="h-9 px-4 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              {createEventMutation.isPending ? 'Adding Event...' : 'Add Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEventModal;

