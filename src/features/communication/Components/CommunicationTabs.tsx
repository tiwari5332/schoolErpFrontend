import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar as CalendarIcon, Users, Clock, Video, MapPin, CheckCircle2, Eye, Search } from "lucide-react";
import { Announcement, Meeting } from '../Constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CommunicationTabsProps {
  announcements: Announcement[];
  meetings: Meeting[];
}

export function CommunicationTabs({ announcements, meetings }: CommunicationTabsProps) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ann.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAudience = selectedAudience === 'all' || ann.targetAudience === selectedAudience;
    const matchesChannel = selectedChannel === 'all' || ann.channels.includes(selectedChannel as any);
    return matchesSearch && matchesAudience && matchesChannel;
  });

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Announcements History */}
        <Card className="border-0 shadow-lg glass-card h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-indigo-50/50 to-transparent pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-indigo-500" />
              Recent Broadcasts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="divide-y divide-slate-100">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-800">{ann.title}</h4>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="h-3 w-3" /> Sent
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">{ann.message}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                      <Users className="h-3 w-3" />
                      Target: {ann.targetAudience}
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                      Channels: {ann.channels.join(', ')}
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md ml-auto">
                      <Clock className="h-3 w-3" />
                      {new Date(ann.sentAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  No broadcasts sent yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      {/* Upcoming Meetings */}
      <Card className="border-0 shadow-lg glass-card h-[600px] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-cyan-50/50 to-transparent pb-4 border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-cyan-500" />
            Upcoming Events & Meetings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto flex-1">
          <div className="divide-y divide-slate-100">
            {meetings.map((mtg) => (
              <div key={mtg.id} className="p-5 hover:bg-slate-50/50 transition-colors flex gap-4">
                
                {/* Date Block */}
                <div className="flex flex-col items-center justify-center bg-cyan-50 text-cyan-700 rounded-xl p-3 h-16 w-16 shrink-0 border border-cyan-100">
                  <span className="text-xs font-semibold uppercase">{new Date(mtg.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-xl font-bold">{new Date(mtg.date).getDate()}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-slate-800">{mtg.title}</h4>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                      {mtg.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      {mtg.startTime} - {mtg.endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-slate-400" />
                      {mtg.participants}
                    </span>
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 bg-white shadow-sm">
                    {mtg.link ? (
                      <>
                        <Video className="h-3.5 w-3.5 text-blue-500" />
                        <a href={mtg.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[200px]">
                          {mtg.link}
                        </a>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-3.5 w-3.5 text-rose-500" />
                        <span className="text-slate-600 truncate max-w-[200px]">{mtg.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {meetings.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                No upcoming meetings scheduled.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Broadcasts Table (Full Width) */}
      <Card className="border-0 shadow-xl hover-lift glass-card flex flex-col">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-indigo-500" />
                All Broadcasts ({filteredAnnouncements.length})
              </CardTitle>
              <CardDescription className="text-sm text-slate-500 mt-1">Complete list of sent announcements and communications</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search broadcasts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 w-full sm:w-[200px] border-2 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 transition-all duration-200 bg-white"
                />
              </div>
              
              <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                <SelectTrigger className="w-full sm:w-[150px] h-10 border-2 border-slate-200 focus:border-indigo-300 bg-white">
                  <SelectValue placeholder="Audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Audiences</SelectItem>
                  <SelectItem value="All">All Roles</SelectItem>
                  <SelectItem value="Parents">Parents</SelectItem>
                  <SelectItem value="Teachers">Teachers</SelectItem>
                  <SelectItem value="Students">Students</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger className="w-full sm:w-[150px] h-10 border-2 border-slate-200 focus:border-indigo-300 bg-white">
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                  <SelectItem value="App Push">App Push</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 bg-slate-50/50">
                <TableHead className="font-medium text-slate-600">Title</TableHead>
                <TableHead className="font-medium text-slate-600">Target</TableHead>
                <TableHead className="font-medium text-slate-600">Date</TableHead>
                <TableHead className="text-right font-medium text-slate-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((ann) => (
                <TableRow 
                  key={ann.id} 
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  onClick={() => setSelectedAnnouncement(ann)}
                >
                  <TableCell className="font-medium text-slate-800">
                    <div className="flex flex-col gap-1">
                      <span className="truncate max-w-xs" title={ann.title}>{ann.title}</span>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 h-5 px-1.5 text-[10px]">
                          Sent
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-slate-600 whitespace-nowrap">
                      <Users className="h-3 w-3" />
                      {ann.targetAudience}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(ann.sentAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <button 
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAnnouncement(ann);
                      }}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAnnouncements.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No broadcasts found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Broadcast Details Dialog */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={(open) => !open && setSelectedAnnouncement(null)}>
        <DialogContent className="sm:max-w-md glass-card">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-indigo-600" />
              </div>
              <DialogTitle className="text-xl">Broadcast Details</DialogTitle>
            </div>
            <DialogDescription>
              Review the details of this announcement.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAnnouncement && (
            <div className="space-y-4 py-2">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Title</h4>
                <p className="text-base font-medium text-slate-800">{selectedAnnouncement.title}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Message</h4>
                <div className="bg-slate-50 p-3 rounded-md border border-slate-100 text-sm text-slate-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {selectedAnnouncement.message}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Target Audience</h4>
                  <div className="flex items-center gap-1.5 text-sm text-slate-700">
                    <Users className="h-4 w-4 text-slate-400" />
                    {selectedAnnouncement.targetAudience}
                    {selectedAnnouncement.targetClass && selectedAnnouncement.targetClass !== 'All' && ` (${selectedAnnouncement.targetClass})`}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Sent At</h4>
                  <div className="flex items-center gap-1.5 text-sm text-slate-700">
                    <Clock className="h-4 w-4 text-slate-400" />
                    {new Date(selectedAnnouncement.sentAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Channels Used</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedAnnouncement.channels.map(channel => (
                    <Badge key={channel} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Sent By</h4>
                <p className="text-sm text-slate-700">{selectedAnnouncement.sentBy}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
