import React, { useState } from 'react';
import { Calendar, Users, GraduationCap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { 
  MOCK_TEACHERS, 
  MOCK_SUBJECTS, 
  MOCK_CLASSES, 
  DEFAULT_TIME_SLOTS, 
  INITIAL_SCHEDULE_SESSIONS, 
  ScheduleSession, 
  TimeSlot 
} from '../../features/schedule-management/Constants';

import { ScheduleGrid } from '../../features/schedule-management/Components/ScheduleGrid';
import { AssignSessionModal } from '../../features/schedule-management/Components/AssignSessionModal';
import { SubstitutePanel } from '../../features/schedule-management/Components/SubstitutePanel';

export default function ScheduleManagementPage() {
  const [sessions, setSessions] = useState<ScheduleSession[]>(INITIAL_SCHEDULE_SESSIONS);
  const [viewMode, setViewMode] = useState<'class' | 'teacher'>('class');
  
  // By default select the first class or first teacher
  const [activeClassId, setActiveClassId] = useState<string>(MOCK_CLASSES[0].id);
  const [activeTeacherId, setActiveTeacherId] = useState<string>(MOCK_TEACHERS[0].id);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<{ day: string; slot: TimeSlot } | null>(null);

  // Substitute Panel State
  const [hoveredSlot, setHoveredSlot] = useState<TimeSlot | null>(null);

  const activeFilterId = viewMode === 'class' ? activeClassId : activeTeacherId;

  const handleSlotClick = (day: string, slot: TimeSlot) => {
    // Only allow assigning if viewing a class right now, to keep flow simple
    if (viewMode === 'class') {
      setModalContext({ day, slot });
      setIsModalOpen(true);
    } else {
      alert("Please switch to 'Class View' to schedule a new period.");
    }
  };

  const handleSaveSession = (newSessionData: Partial<ScheduleSession>) => {
    const newSession: ScheduleSession = {
      id: `SES${Math.floor(Math.random() * 10000)}`,
      dayOfWeek: newSessionData.dayOfWeek!,
      timeSlotId: newSessionData.timeSlotId!,
      classId: newSessionData.classId!,
      subjectId: newSessionData.subjectId!,
      teacherId: newSessionData.teacherId!,
      room: newSessionData.room!
    };
    
    setSessions([...sessions, newSession]);
    setIsModalOpen(false);
    setModalContext(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
            <Calendar className="h-6 w-6 text-indigo-500" />
            Master Schedule
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage timetables, assign teachers, and handle substitutes.</p>
        </div>
        
        {/* View Controls */}
        <div className="flex flex-wrap gap-4 items-center bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'class' | 'teacher')} className="w-auto">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="class" className="gap-2 text-xs">
                <GraduationCap className="h-4 w-4" /> Class View
              </TabsTrigger>
              <TabsTrigger value="teacher" className="gap-2 text-xs">
                <Users className="h-4 w-4" /> Teacher View
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="w-[180px]">
            {viewMode === 'class' ? (
              <Select value={activeClassId} onValueChange={setActiveClassId}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CLASSES.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>Grade {cls.grade}-{cls.section}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select value={activeTeacherId} onValueChange={setActiveTeacherId}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_TEACHERS.map(tch => (
                    <SelectItem key={tch.id} value={tch.id}>{tch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Calendar Grid */}
        <div className="xl:col-span-3">
          <ScheduleGrid 
            sessions={sessions}
            timeSlots={DEFAULT_TIME_SLOTS}
            teachers={MOCK_TEACHERS}
            subjects={MOCK_SUBJECTS}
            viewMode={viewMode}
            activeFilterId={activeFilterId}
            onSlotClick={handleSlotClick}
            onSlotHover={setHoveredSlot}
          />
        </div>

        {/* Sidebar Panel */}
        <div className="xl:col-span-1">
          <SubstitutePanel 
            teachers={MOCK_TEACHERS}
            sessions={sessions}
            currentDay={modalContext?.day || 'Monday'} // Fallback or could use actual current day
            currentTimeSlot={hoveredSlot}
          />
        </div>
      </div>

      {modalContext && (
        <AssignSessionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSession}
          dayOfWeek={modalContext.day}
          timeSlot={modalContext.slot}
          classId={activeClassId}
          teachers={MOCK_TEACHERS}
          subjects={MOCK_SUBJECTS}
          classes={MOCK_CLASSES}
          existingSessions={sessions}
        />
      )}
    </div>
  );
}
