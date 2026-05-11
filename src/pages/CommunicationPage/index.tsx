import React, { useState } from 'react';
import { Megaphone, CalendarPlus, Radio, BellRing, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Announcement, Meeting, MOCK_ANNOUNCEMENTS, MOCK_MEETINGS } from '../../features/communication/Constants';
import { ComposeBroadcastModal } from '../../features/communication/Components/ComposeBroadcastModal';
import { ScheduleMeetingModal } from '../../features/communication/Components/ScheduleMeetingModal';
import { CommunicationTabs } from '../../features/communication/Components/CommunicationTabs';

export default function CommunicationPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS);
  
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);

  const handleSendBroadcast = (newAnn: Partial<Announcement>) => {
    const announcement: Announcement = {
      id: `ANN${Math.floor(Math.random() * 1000)}`,
      title: newAnn.title!,
      message: newAnn.message!,
      targetAudience: newAnn.targetAudience!,
      targetClass: newAnn.targetClass,
      channels: newAnn.channels!,
      sentAt: newAnn.sentAt!,
      sentBy: newAnn.sentBy!
    };
    
    // Add to top of list
    setAnnouncements([announcement, ...announcements]);
    setIsBroadcastOpen(false);
  };

  const handleScheduleMeeting = (newMtg: Partial<Meeting>) => {
    const meeting: Meeting = {
      id: `MTG${Math.floor(Math.random() * 1000)}`,
      title: newMtg.title!,
      date: newMtg.date!,
      startTime: newMtg.startTime!,
      endTime: newMtg.endTime!,
      type: newMtg.type! as any,
      participants: newMtg.participants!,
      link: newMtg.link,
      location: newMtg.location,
      organizer: newMtg.organizer!
    };
    
    // In a real app, you'd sort these by date. For mock, just push to top.
    setMeetings([meeting, ...meetings]);
    setIsMeetingOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <Radio className="h-6 w-6 text-indigo-500" />
            Communication Hub
          </h2>
          <p className="text-sm text-slate-500 mt-1">Broadcast announcements and schedule school-wide events.</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => setIsMeetingOpen(true)}
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2"
          >
            <CalendarPlus className="h-4 w-4 text-cyan-600" />
            Schedule Event
          </Button>
          <Button 
            onClick={() => setIsBroadcastOpen(true)}
            className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <Megaphone className="h-4 w-4" />
            New Broadcast
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm glass-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Megaphone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Broadcasts</p>
              <h3 className="text-2xl font-bold text-slate-800">{announcements.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm glass-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Upcoming Events</p>
              <h3 className="text-2xl font-bold text-slate-800">{meetings.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm glass-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <BellRing className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Alerts</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {announcements.filter(a => new Date(a.sentAt).getTime() > Date.now() - 86400000).length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <CommunicationTabs 
        announcements={announcements} 
        meetings={meetings} 
      />

      {/* Modals */}
      <ComposeBroadcastModal 
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        onSend={handleSendBroadcast}
      />

      <ScheduleMeetingModal 
        isOpen={isMeetingOpen}
        onClose={() => setIsMeetingOpen(false)}
        onSchedule={handleScheduleMeeting}
      />
    </div>
  );
}
