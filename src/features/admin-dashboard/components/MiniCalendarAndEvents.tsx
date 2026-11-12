import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarEvent } from '../../../types/dashboard';
import { useCalendarEvents, useUpcomingEvents } from '../hooks/useDashboardQueries';
import { AddEventModal } from './AddEventModal';
import { isDateInFuture } from '../utils/dashboardFormatters';

interface MiniCalendarAndEventsProps {
  serverDateStr: string; // "YYYY-MM-DD" e.g. "2026-11-08"
  selectedAttendanceDate: string; // "YYYY-MM-DD"
  onSelectAttendanceDate: (dateStr: string) => void;
  isAddEventOpen: boolean;
  setIsAddEventOpen: (open: boolean) => void;
}

export function MiniCalendarAndEvents({
  serverDateStr,
  selectedAttendanceDate,
  onSelectAttendanceDate,
  isAddEventOpen,
  setIsAddEventOpen,
}: MiniCalendarAndEventsProps) {
  // Parse server date
  const [serverYear, serverMonth, serverDay] = useMemo(() => {
    const cleanDate = (serverDateStr || '2026-11-08').split('T')[0];
    const parts = cleanDate.split('-').map(Number);
    return [parts[0] || 2026, (parts[1] || 11) - 1, parts[2] || 8];
  }, [serverDateStr]);

  // Current calendar view (starts on server month)
  const [viewYear, setViewYear] = useState(serverYear);
  const [viewMonth, setViewMonth] = useState(serverMonth); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(serverDay);

  // Calculate visible range for API query
  const { rangeFrom, rangeTo } = useMemo(() => {
    const start = new Date(viewYear, viewMonth, 1);
    const end = new Date(viewYear, viewMonth + 1, 0);
    return {
      rangeFrom: start.toISOString().split('T')[0],
      rangeTo: end.toISOString().split('T')[0],
    };
  }, [viewYear, viewMonth]);

  // Fetch range events & 30-day upcoming events
  const {
    data: monthEvents = [],
    isError: isMonthError,
    refetch: refetchMonthEvents,
  } = useCalendarEvents(rangeFrom, rangeTo);
  const {
    data: upcomingEvents = [],
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
    refetch: refetchUpcomingEvents,
  } = useUpcomingEvents(30, 5);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday = 0

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Group events by day of month
  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    for (const evt of monthEvents) {
      if (!evt || !evt.startDate) continue;
      const cleanDate = String(evt.startDate).split('T')[0];
      const parts = cleanDate.split('-').map(Number);
      const y = parts[0];
      const m = (parts[1] || 1) - 1;
      const d = parts[2];
      if (y === viewYear && m === viewMonth && !isNaN(d)) {
        const list = map.get(d) || [];
        list.push(evt);
        map.set(d, list);
      }
    }
    return map;
  }, [monthEvents, viewYear, viewMonth]);

  const handleDayClick = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(dayNumber).padStart(2, '0');
    const clickedDateStr = `${viewYear}-${mm}-${dd}`;

    // Only allow setting attendance date if it is not in the future relative to server date
    if (!isDateInFuture(clickedDateStr, serverDateStr)) {
      onSelectAttendanceDate(clickedDateStr);
    }
  };

  // Format the selected calendar day date string
  const selectedFullDateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

  // Filter upcoming events if a specific day is clicked with events, else show all upcoming
  const filteredUpcoming = useMemo(() => {
    const dayEvents = eventsByDay.get(selectedDay);
    if (dayEvents && dayEvents.length > 0) {
      return dayEvents;
    }
    return upcomingEvents;
  }, [eventsByDay, selectedDay, upcomingEvents]);

  return (
    <Card className="border border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col justify-between h-full">
      <CardHeader className="p-4 pb-2 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">
              Academic Calendar
            </span>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{monthNames[viewMonth]} {viewYear}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous month"
              onClick={handlePrevMonth}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={handleNextMonth}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsAddEventOpen(true)}
              className="h-7 px-2 text-xs text-white bg-white/15 hover:bg-white/25 rounded-lg ml-1 font-medium gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Event</span>
            </Button>
          </div>
        </div>

        {/* Server date indicator */}
        <div className="pt-1 text-[11px] text-indigo-200/80 flex items-center gap-1">
          <CalendarIcon className="h-3 w-3 text-indigo-300" />
          <span>Server Date: <strong>8 Nov 2026 (Sunday)</strong></span>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Calendar Grid */}
        <div>
          {/* Day of week headers */}
          <div className="grid grid-cols-7 text-center mb-1">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d, i) => (
              <span
                key={d}
                className={`text-[11px] font-semibold ${
                  i === 6 ? 'text-rose-500' : 'text-slate-400'
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Month days */}
          <div className="grid grid-cols-7 gap-1 text-center" role="grid">
            {/* Empty leading cells */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-7 w-7" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const isServerToday =
                viewYear === serverYear && viewMonth === serverMonth && day === serverDay;
              const isSelected = day === selectedDay;
              const dayEvts = eventsByDay.get(day) || [];

              const hasHoliday = dayEvts.some(
                (e) => e.type === 'holiday' || e.type === 'weekly_off' || e.isHoliday || e.isWeeklyOff
              );
              const hasRegularEvent = dayEvts.some(
                (e) => e.type !== 'holiday' && e.type !== 'weekly_off'
              );

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={`h-7 w-7 mx-auto rounded-lg text-xs font-semibold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isServerToday
                      ? 'bg-indigo-100 text-indigo-900 ring-1 ring-indigo-400 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{day}</span>

                  {/* Event indicators */}
                  <div className="absolute bottom-0.5 flex items-center gap-0.5 pointer-events-none">
                    {hasHoliday && (
                      <span className="h-1 w-1 rounded-full bg-rose-500" />
                    )}
                    {hasRegularEvent && (
                      <span className="h-1 w-1 rounded-full bg-indigo-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-indigo-600 inline-block" />
            <span>Today ({serverDateStr})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" />
            <span>Holiday / Off</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-indigo-400 inline-block" />
            <span>Event</span>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              {eventsByDay.has(selectedDay)
                ? `Events on Day ${selectedDay}`
                : 'Upcoming Events (30 Days)'}
            </span>
            <span className="text-[10px] text-slate-400">
              {filteredUpcoming.length} scheduled
            </span>
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-0.5 divide-y divide-slate-50">
            {isUpcomingError ? (
              <div className="py-4 text-center space-y-2 bg-rose-50/60 rounded-xl p-3 border border-rose-100">
                <p className="text-xs text-rose-600 font-medium">Failed to load events</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    refetchMonthEvents();
                    refetchUpcomingEvents();
                  }}
                  className="h-7 text-xs border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </div>
            ) : filteredUpcoming.length === 0 ? (
              <div className="py-5 text-center space-y-2 bg-slate-50/60 rounded-xl p-3">
                <p className="text-xs text-slate-500">No upcoming events scheduled</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddEventOpen(true)}
                  className="h-7 text-xs border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add your first event
                </Button>
              </div>
            ) : (
              filteredUpcoming.map((event) => {
                const isHoliday =
                  event.type === 'holiday' || event.type === 'weekly_off' || event.isHoliday;

                return (
                  <div
                    key={event.id}
                    className="pt-1.5 first:pt-0 flex items-start justify-between gap-2"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full shrink-0 ${
                            isHoliday ? 'bg-rose-500' : 'bg-indigo-500'
                          }`}
                        />
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {event.title}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 pl-3.5">
                        <Clock className="h-2.5 w-2.5" />
                        <span>{event.startDate}</span>
                        {event.endDate && <span>– {event.endDate}</span>}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-[10px] capitalize shrink-0 ${
                        isHoliday
                          ? 'border-rose-200 text-rose-700 bg-rose-50'
                          : 'border-indigo-100 text-indigo-700 bg-indigo-50'
                      }`}
                    >
                      {event.type.replace('_', ' ')}
                    </Badge>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </CardContent>

      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        defaultDate={selectedFullDateStr}
      />
    </Card>
  );
}

export default MiniCalendarAndEvents;

