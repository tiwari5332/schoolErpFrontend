import React from 'react';
import { Calendar, Users, GraduationCap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { 
  ScheduleSession, 
  TimeSlot,
  Teacher,
  Subject,
  ClassSection
} from '../../features/schedule-management/Constants';
import { useScheduleManagement } from '../../features/schedule-management/hooks/useScheduleManagement';

import { ScheduleGrid } from '../../features/schedule-management/Components/ScheduleGrid';
import { AssignSessionModal } from '../../features/schedule-management/Components/AssignSessionModal';
import { SubstitutePanel } from '../../features/schedule-management/Components/SubstitutePanel';

export default function ScheduleManagementPage() {
  const {
    sessions,
    teachers,
    subjects,
    classes,
    timeSlots,
    isLoading,
    viewMode,
    setViewMode,
    activeClassId,
    setActiveClassId,
    activeTeacherId,
    setActiveTeacherId,
    isModalOpen,
    setIsModalOpen,
    modalContext,
    setHoveredSlot,
    hoveredSlot,
    activeFilterId,
    handleSlotClick,
    handleSaveSession
  } = useScheduleManagement();

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
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
                      {classes.map(cls => (
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
                      {teachers.map(tch => (
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
                timeSlots={timeSlots}
                teachers={teachers}
                subjects={subjects}
                viewMode={viewMode}
                activeFilterId={activeFilterId}
                onSlotClick={handleSlotClick}
                onSlotHover={setHoveredSlot}
              />
            </div>

            {/* Sidebar Panel */}
            <div className="xl:col-span-1">
              <SubstitutePanel 
                teachers={teachers}
                sessions={sessions}
                currentDay={modalContext?.day || 'Monday'} 
                currentTimeSlot={hoveredSlot}
              />
            </div>
          </div>
        </>
      )}


      {modalContext && (
        <AssignSessionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSession}
          dayOfWeek={modalContext.day}
          timeSlot={modalContext.slot}
          classId={activeClassId}
          teachers={teachers}
          subjects={subjects}
          classes={classes}
          existingSessions={sessions}
        />
      )}
    </div>
  );
}
