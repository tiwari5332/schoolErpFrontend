import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { ScheduleSession, Teacher, Subject, ClassSection, TimeSlot } from '../Constants';

interface AssignSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: Partial<ScheduleSession>) => void;
  dayOfWeek: string;
  timeSlot: TimeSlot;
  classId: string;
  teachers: Teacher[];
  subjects: Subject[];
  classes: ClassSection[];
  existingSessions: ScheduleSession[];
}

export function AssignSessionModal({ 
  isOpen, onClose, onSave, dayOfWeek, timeSlot, classId, teachers, subjects, classes, existingSessions 
}: AssignSessionModalProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  
  // Validation State
  const [clashError, setClashError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedSubjectId('');
      setSelectedTeacherId('');
      setRoom('');
      setClashError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    // Perform Clash Detection
    if (selectedTeacherId && dayOfWeek && timeSlot) {
      // Check if this teacher is already assigned to a DIFFERENT class at this exact time slot and day
      const clash = existingSessions.find(
        (s) => s.dayOfWeek === dayOfWeek && 
               s.timeSlotId === timeSlot.id && 
               s.teacherId === selectedTeacherId &&
               s.classId !== classId
      );
      
      if (clash) {
        const conflictingClass = classes.find(c => c.id === clash.classId);
        setClashError(`Clash Detected! Teacher is already assigned to Grade ${conflictingClass?.grade}-${conflictingClass?.section} during this period.`);
      } else {
        setClashError(null);
      }
    } else {
      setClashError(null);
    }
  }, [selectedTeacherId, dayOfWeek, timeSlot, existingSessions, classId, classes]);

  const handleSave = () => {
    if (clashError) return;
    
    onSave({
      dayOfWeek,
      timeSlotId: timeSlot.id,
      classId,
      subjectId: selectedSubjectId,
      teacherId: selectedTeacherId,
      room: room || 'TBD'
    });
  };

  const currentClass = classes.find(c => c.id === classId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass-card border-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Assign Class Schedule
          </DialogTitle>
          <DialogDescription>
            {dayOfWeek} • Period {timeSlot.periodNumber} ({timeSlot.startTime} - {timeSlot.endTime})
            <br/>
            Grade {currentClass?.grade}-{currentClass?.section}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</Label>
            <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
              <SelectTrigger id="subject" className="border-slate-200 focus:border-indigo-400">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(sub => (
                  <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="teacher" className="text-sm font-medium text-slate-700">Teacher</Label>
            <Select value={selectedTeacherId} onValueChange={setSelectedTeacherId}>
              <SelectTrigger 
                id="teacher" 
                className={`border-slate-200 focus:border-indigo-400 ${clashError ? 'border-rose-400 focus:border-rose-500 bg-rose-50 text-rose-700' : ''}`}
              >
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map(teacher => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name} ({teacher.subjectSpecialty})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="room" className="text-sm font-medium text-slate-700">Room</Label>
            <Input 
              id="room" 
              placeholder="e.g. Lab 1, Room 104" 
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
            />
          </div>

          {/* Validation Feedback UI */}
          {selectedTeacherId && (
            <div className={`p-3 rounded-lg border flex items-start gap-2 text-sm ${
              clashError ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              {clashError ? (
                <>
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p>{clashError}</p>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                  <p>Teacher is available during this period.</p>
                </>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600 hover:bg-slate-50">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!selectedSubjectId || !selectedTeacherId || !!clashError}
            className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Save Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
