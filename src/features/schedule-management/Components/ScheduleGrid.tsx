import React from 'react';
import { ScheduleSession, TimeSlot, DAYS_OF_WEEK, Teacher, Subject } from '../Constants';
import { SessionCard } from './SessionCard';
import { Plus } from 'lucide-react';

interface ScheduleGridProps {
  sessions: ScheduleSession[];
  timeSlots: TimeSlot[];
  teachers: Teacher[];
  subjects: Subject[];
  viewMode: 'class' | 'teacher';
  activeFilterId: string; // the specific class ID or teacher ID currently being viewed
  onSlotClick: (day: string, timeSlot: TimeSlot) => void;
  onSlotHover?: (timeSlot: TimeSlot | null) => void;
}

export function ScheduleGrid({ 
  sessions, timeSlots, teachers, subjects, viewMode, activeFilterId, onSlotClick, onSlotHover 
}: ScheduleGridProps) {
  
  // Filter sessions relevant to the current view
  const visibleSessions = sessions.filter(s => 
    viewMode === 'class' ? s.classId === activeFilterId : s.teacherId === activeFilterId
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="min-w-[800px]">
        {/* Header Row (Days) */}
        <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-slate-200 bg-slate-50">
          <div className="p-3 text-center border-r border-slate-200 flex items-center justify-center font-medium text-slate-500 text-sm">
            Time
          </div>
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="p-3 text-center border-r border-slate-200 font-semibold text-slate-700">
              {day}
            </div>
          ))}
        </div>

        {/* Time Slots Rows */}
        <div className="divide-y divide-slate-200">
          {timeSlots.map(slot => (
            <div key={slot.id} className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr] group">
              
              {/* Time Column */}
              <div className="p-2 border-r border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-medium text-slate-700">{slot.startTime}</span>
                <span className="text-xs text-slate-400">to</span>
                <span className="text-sm font-medium text-slate-700">{slot.endTime}</span>
              </div>

              {/* Day Columns */}
              {DAYS_OF_WEEK.map(day => {
                const isBreak = slot.isBreak;
                const sessionForSlot = visibleSessions.find(s => s.dayOfWeek === day && s.timeSlotId === slot.id);
                
                return (
                  <div 
                    key={`${day}-${slot.id}`} 
                    className={`border-r border-slate-200 p-1.5 transition-colors relative min-h-[90px] ${
                      isBreak ? 'bg-amber-50/50' : 'hover:bg-slate-50'
                    }`}
                    onMouseEnter={() => onSlotHover && onSlotHover(slot)}
                    onMouseLeave={() => onSlotHover && onSlotHover(null)}
                  >
                    {isBreak ? (
                      <div className="h-full w-full flex items-center justify-center text-amber-600/60 font-medium text-sm rotate-[-15deg] select-none pointer-events-none">
                        {slot.label || 'Break'}
                      </div>
                    ) : sessionForSlot ? (
                      <SessionCard 
                        session={sessionForSlot}
                        subject={subjects.find(s => s.id === sessionForSlot.subjectId)!}
                        teacher={teachers.find(t => t.id === sessionForSlot.teacherId)!}
                        viewMode={viewMode}
                      />
                    ) : (
                      <div 
                        onClick={() => onSlotClick(day, slot)}
                        className="h-full w-full rounded-lg border-2 border-dashed border-transparent hover:border-indigo-300 hover:bg-indigo-50/50 flex items-center justify-center cursor-pointer text-indigo-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Plus className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
