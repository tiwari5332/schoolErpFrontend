import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Clock, Video, MapPin, Users } from "lucide-react";
import { Meeting, AudienceRole } from '../Constants';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (meeting: Partial<Meeting>) => void;
}

export function ScheduleMeetingModal({ isOpen, onClose, onSchedule }: ScheduleMeetingModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [type, setType] = useState<'PTM' | 'Staff Meeting' | 'General'>('PTM');
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
      <DialogContent className="sm:max-w-[500px] glass-card border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Schedule Meeting
              </DialogTitle>
              <DialogDescription>
                Set up a Parent-Teacher Meeting or Staff alignment.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-5 py-2">
          {/* Title & Type */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2 grid gap-2">
              <Label className="text-sm font-medium text-slate-700">Meeting Title *</Label>
              <Input 
                placeholder="e.g. End of Term PTM" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-100"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700">Type</Label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger className="border-slate-200 focus:border-cyan-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PTM">PTM</SelectItem>
                  <SelectItem value="Staff Meeting">Staff</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="col-span-2 sm:col-span-1 grid gap-2">
              <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" /> Date *
              </Label>
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-100"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Start *
              </Label>
              <Input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-100"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Clock className="h-3 w-3" /> End *
              </Label>
              <Input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-100"
              />
            </div>
          </div>

          {/* Participants & Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Users className="h-3 w-3" /> Participants *
              </Label>
              <Select value={participants} onValueChange={(val: any) => setParticipants(val)}>
                <SelectTrigger className="border-slate-200 focus:border-cyan-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parents">Parents</SelectItem>
                  <SelectItem value="Teachers">Teachers</SelectItem>
                  <SelectItem value="All">All Staff & Parents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {isVirtual ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                  {isVirtual ? 'Meeting Link' : 'Location'}
                </Label>
                <button 
                  onClick={() => setIsVirtual(!isVirtual)}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Switch to {isVirtual ? 'In-Person' : 'Virtual'}
                </button>
              </div>
              <Input 
                placeholder={isVirtual ? "https://meet.google.com/..." : "e.g. Main Hall"} 
                value={locationOrLink}
                onChange={(e) => setLocationOrLink(e.target.value)}
                className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-100"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4 mt-2">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600 hover:bg-slate-50">
            Cancel
          </Button>
          <Button 
            onClick={handleSchedule} 
            disabled={!title || !date || !startTime || !endTime || !participants}
            className="gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            Schedule Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
