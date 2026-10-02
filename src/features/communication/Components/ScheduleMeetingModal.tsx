import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Clock, Video, MapPin, Users, CalendarPlus } from "lucide-react";
import { Meeting, AudienceRole, EventCategory, DEFAULT_EVENT_CATEGORIES } from '../Constants';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (meeting: Partial<Meeting>) => void;
  categories?: EventCategory[];
  onOpenManageCategories?: () => void;
}

export function ScheduleMeetingModal({ 
  isOpen, 
  onClose, 
  onSchedule,
  categories = DEFAULT_EVENT_CATEGORIES,
  onOpenManageCategories
}: ScheduleMeetingModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [type, setType] = useState<string>('PTM');
  const [participants, setParticipants] = useState<AudienceRole>('Parents');
  const [isVirtual, setIsVirtual] = useState(false);
  const [locationOrLink, setLocationOrLink] = useState('');

  const handleSchedule = () => {
    if (!title || !date || !startTime || !endTime || !participants) return;
    
    onSchedule({
      title,
      date,
      startTime,
      endTime,
      type,
      participants,
      link: isVirtual ? locationOrLink : undefined,
      location: !isVirtual ? locationOrLink : undefined,
      organizer: 'Admin'
    });

    // Reset
    setTitle('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setLocationOrLink('');
    setIsVirtual(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xl space-y-4">
        <DialogHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-xl shadow-sm shrink-0">
              <CalendarPlus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                Schedule Event or PTM Meeting
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Organize parent-teacher consultations, staff alignments or school events
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-1 text-xs">
          {/* Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <Label className="text-xs font-semibold text-slate-700">Meeting / Event Title *</Label>
              <Input 
                placeholder="e.g. Term 1 Progress Review & PTM" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9 text-xs rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-slate-700">Category Type</Label>
                {onOpenManageCategories && (
                  <button 
                    type="button" 
                    onClick={onOpenManageCategories}
                    className="text-[10px] text-cyan-600 font-bold hover:underline"
                  >
                    + Manage
                  </button>
                )}
              </div>
              <Select value={type} onValueChange={(v: string) => setType(v)}>
                <SelectTrigger className="h-9 text-xs rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.name} className="text-xs">{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <CalendarIcon className="h-3 w-3 text-cyan-600" /> Event Date *
              </Label>
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-9 text-xs rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Clock className="h-3 w-3 text-cyan-600" /> Start Time *
              </Label>
              <Input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="h-9 text-xs rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Clock className="h-3 w-3 text-cyan-600" /> End Time *
              </Label>
              <Input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-9 text-xs rounded-xl border-slate-200"
              />
            </div>
          </div>

          {/* Participants & Location Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Users className="h-3 w-3 text-purple-600" /> Attendees *
              </Label>
              <Select value={participants} onValueChange={(val: any) => setParticipants(val)}>
                <SelectTrigger className="h-9 text-xs rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parents" className="text-xs">Parents</SelectItem>
                  <SelectItem value="Teachers" className="text-xs">Teachers</SelectItem>
                  <SelectItem value="All" className="text-xs">All Staff & Parents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  {isVirtual ? <Video className="h-3 w-3 text-blue-500" /> : <MapPin className="h-3 w-3 text-rose-500" />}
                  {isVirtual ? 'Meeting Link' : 'Physical Location'}
                </Label>
                <button 
                  type="button"
                  onClick={() => setIsVirtual(!isVirtual)}
                  className="text-[11px] text-cyan-600 hover:text-cyan-700 font-bold"
                >
                  Switch to {isVirtual ? 'In-Person' : 'Virtual'}
                </button>
              </div>
              <Input 
                placeholder={isVirtual ? "https://meet.google.com/..." : "e.g. School Auditorium"} 
                value={locationOrLink}
                onChange={(e) => setLocationOrLink(e.target.value)}
                className="h-9 text-xs rounded-xl border-slate-200"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-9 text-xs border-slate-200">
            Cancel
          </Button>
          <Button 
            onClick={handleSchedule} 
            disabled={!title || !date || !startTime || !endTime || !participants}
            className="gradient-cyan text-white font-semibold rounded-xl h-9 text-xs px-5 gap-1.5 shadow-colored-cyan"
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            Schedule Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

