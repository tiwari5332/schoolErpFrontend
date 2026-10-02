import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Megaphone, 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  Eye, 
  Search, 
  Mail, 
  Smartphone, 
  MessageSquare,
  Inbox,
  ExternalLink,
  CalendarPlus,
  UserCheck,
  Building,
  List,
  LayoutGrid,
  CalendarCheck,
  CalendarDays,
  Filter,
  ArrowUpRight,
  Sparkles,
  Send,
  CheckCircle,
  Zap,
  Server,
  FileText,
  Copy,
  Plus,
  Trash2,
  Pen,
  Check,
  Tag
} from "lucide-react";
import { Announcement, Meeting, CommunicationChannel, AnnouncementTemplate, COMMUNICATION_TEMPLATES, EventCategory, DEFAULT_EVENT_CATEGORIES } from '../Constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CommunicationTabsProps {
  announcements: Announcement[];
  meetings: Meeting[];
  templates?: AnnouncementTemplate[];
  categories?: EventCategory[];
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onOpenBroadcastModal?: () => void;
  onOpenCreateTemplate?: () => void;
  onOpenManageCategories?: () => void;
  onSaveCategory?: (category: EventCategory) => void;
  onDeleteCategory?: (categoryId: string) => void;
}

export function CommunicationTabs({ 
  announcements, 
  meetings, 
  templates = COMMUNICATION_TEMPLATES,
  categories = DEFAULT_EVENT_CATEGORIES,
  activeTab = 'broadcasts',
  setActiveTab,
  onOpenBroadcastModal,
  onOpenCreateTemplate,
  onOpenManageCategories,
  onSaveCategory,
  onDeleteCategory
}: CommunicationTabsProps) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  
  // Broadcast Tab Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [broadcastViewMode, setBroadcastViewMode] = useState<'feed' | 'table'>('feed');

  // Events Table Filter States
  const [eventsTimingFilter, setEventsTimingFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [eventsTypeFilter, setEventsTypeFilter] = useState<string>('all');
  const [eventsSearchTerm, setEventsSearchTerm] = useState<string>('');
  const [eventsViewMode, setEventsViewMode] = useState<'table' | 'grid'>('table');

  // Dedicated Category Tab States
  const [categorySearch, setCategorySearch] = useState('');
  const [editingCategory, setEditingCategory] = useState<EventCategory | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('cyan');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleStartAddCategory = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategoryColor('cyan');
    setCategoryDescription('');
    setIsAddingCategory(true);
  };

  const handleStartEditCategory = (cat: EventCategory) => {
    setIsAddingCategory(false);
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategoryColor(cat.color || 'cyan');
    setCategoryDescription(cat.description || '');
  };

  const handleSaveCategoryForm = () => {
    if (!categoryName.trim()) return;

    const targetId = editingCategory ? editingCategory.id : `cat-${Date.now()}`;
    const newCat: EventCategory = {
      id: targetId,
      name: categoryName.trim(),
      color: categoryColor,
      description: categoryDescription.trim(),
      isDefault: editingCategory?.isDefault || false
    };

    onSaveCategory?.(newCat);

    setIsAddingCategory(false);
    setEditingCategory(null);
    setCategoryName('');
    setCategoryDescription('');
  };

  const getCategoryBadgeClass = (color: string) => {
    switch (color) {
      case 'cyan': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'indigo': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'emerald': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'amber': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'rose': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'purple': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ann.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ann.sentBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAudience = selectedAudience === 'all' || ann.targetAudience === selectedAudience;
    const matchesChannel = selectedChannel === 'all' || ann.channels.includes(selectedChannel as any);
    return matchesSearch && matchesAudience && matchesChannel;
  });

  const filteredCategories = (categories || []).filter(cat => 
    cat.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(categorySearch.toLowerCase()))
  );

  // Helper to determine if an event date is upcoming relative to current date
  const isUpcomingEvent = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  const filteredMeetings = meetings.filter(mtg => {
    const matchesSearch = mtg.title.toLowerCase().includes(eventsSearchTerm.toLowerCase()) ||
                          (mtg.location && mtg.location.toLowerCase().includes(eventsSearchTerm.toLowerCase())) ||
                          mtg.organizer.toLowerCase().includes(eventsSearchTerm.toLowerCase()) ||
                          mtg.participants.toLowerCase().includes(eventsSearchTerm.toLowerCase());
    
    const matchesType = eventsTypeFilter === 'all' || mtg.type === eventsTypeFilter;
    
    const isUpcoming = isUpcomingEvent(mtg.date);
    const matchesTiming = eventsTimingFilter === 'all' || 
                          (eventsTimingFilter === 'upcoming' && isUpcoming) || 
                          (eventsTimingFilter === 'past' && !isUpcoming);
                          
    return matchesSearch && matchesType && matchesTiming;
  });

  const totalEventsCount = meetings.length;
  const upcomingEventsCount = meetings.filter(m => isUpcomingEvent(m.date)).length;
  const pastEventsCount = meetings.filter(m => !isUpcomingEvent(m.date)).length;

  const getChannelIcon = (channel: CommunicationChannel) => {
    switch (channel) {
      case 'Email': return <Mail className="h-3 w-3 text-indigo-500" />;
      case 'SMS': return <MessageSquare className="h-3 w-3 text-emerald-500" />;
      case 'App Push': return <Smartphone className="h-3 w-3 text-purple-500" />;
      default: return <Megaphone className="h-3 w-3 text-slate-500" />;
    }
  };

  const isBroadcastsTab = activeTab === 'broadcasts' || activeTab === 'broadcast-feed' || activeTab === 'broadcast-history';
  const isEventsTab = activeTab === 'events' || activeTab === 'events-schedule';
  const isTemplatesTab = activeTab === 'templates-channels';
  const isCategoriesTab = activeTab === 'event-categories' || activeTab === 'categories';

  return (
    <div className="space-y-6">
      {/* ════════════════════════════════════════════════════════ */}
      {/* TAB 2: BROADCASTS FEED & MASTER LOG                      */}
      {/* ════════════════════════════════════════════════════════ */}
      {isBroadcastsTab && (
        <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
          {/* Header & Controls Bar */}
          <CardHeader className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Megaphone className="h-4.5 w-4.5 text-emerald-600" />
                School Broadcast Feed & Delivery Log ({filteredAnnouncements.length})
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">
                Manage, search, and inspect dispatched announcements sent to students, parents, and staff
              </CardDescription>
            </div>

            {/* View Mode Switcher (Feed vs Master Audit Table) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBroadcastViewMode('feed')}
                className={`h-7 px-3 text-xs rounded-lg font-semibold gap-1.5 ${
                  broadcastViewMode === 'feed'
                    ? 'bg-white text-emerald-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Feed View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBroadcastViewMode('table')}
                className={`h-7 px-3 text-xs rounded-lg font-semibold gap-1.5 ${
                  broadcastViewMode === 'table'
                    ? 'bg-white text-emerald-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="h-3.5 w-3.5" /> Master Audit Log
              </Button>
            </div>
          </CardHeader>

          {/* Filter Bar */}
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Search broadcast subject or message body..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9 text-xs rounded-xl border-slate-200 bg-white"
                />
              </div>

              <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                <SelectTrigger className="w-full sm:w-40 h-9 text-xs rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Target Audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Audiences</SelectItem>
                  <SelectItem value="All">Global (Everyone)</SelectItem>
                  <SelectItem value="Parents">Parents Only</SelectItem>
                  <SelectItem value="Teachers">Teachers Only</SelectItem>
                  <SelectItem value="Students">Students Only</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger className="w-full sm:w-36 h-9 text-xs rounded-xl border-slate-200 bg-white">
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

            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-semibold shrink-0">
              Showing {filteredAnnouncements.length} Records
            </Badge>
          </div>

          {/* VIEW 1: FEED CARDS VIEW */}
          {broadcastViewMode === 'feed' && (
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => setSelectedAnnouncement(ann)}
                    className="p-5 border border-slate-200/80 rounded-2xl bg-white hover:bg-slate-50/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group space-y-3"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {ann.title}
                        </h4>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 shrink-0 text-[10px] px-2 py-0.5 font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> Dispatched
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {ann.message}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px]">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium flex items-center gap-1 text-[10px]">
                        <Users className="h-3 w-3 text-slate-400" />
                        {ann.targetAudience}
                        {ann.targetClass && ann.targetClass !== 'All' && ` (${ann.targetClass})`}
                      </Badge>

                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-lg text-slate-600 font-medium">
                        {ann.channels.map((ch) => (
                          <span key={ch} className="inline-flex items-center gap-1 mr-1">
                            {getChannelIcon(ch as CommunicationChannel)}
                            {ch}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-slate-400 ml-auto font-medium">
                        <Clock className="h-3 w-3" />
                        {new Date(ann.sentAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredAnnouncements.length === 0 && (
                  <div className="col-span-2 p-12 text-center flex flex-col items-center justify-center space-y-2">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <Inbox className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-medium text-slate-500">No broadcasts found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          )}

          {/* VIEW 2: MASTER AUDIT LOG TABLE */}
          {broadcastViewMode === 'table' && (
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="border-b border-slate-200/80">
                      <TableHead className="font-semibold text-xs text-slate-700 pl-6">Title & Subject</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Target Audience</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Channels</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Sent At</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Dispatched By</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700 text-right pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAnnouncements.map((ann) => (
                      <TableRow 
                        key={ann.id} 
                        className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors cursor-pointer"
                        onClick={() => setSelectedAnnouncement(ann)}
                      >
                        <TableCell className="pl-6">
                          <div className="space-y-0.5">
                            <div className="font-bold text-xs text-slate-900">{ann.title}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 max-w-sm">{ann.message}</div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                            {ann.targetAudience}
                            {ann.targetClass && ann.targetClass !== 'All' && ` (${ann.targetClass})`}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {ann.channels.map(ch => (
                              <Badge key={ch} variant="secondary" className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5">
                                {ch}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>

                        <TableCell className="text-xs text-slate-600 font-medium">
                          {new Date(ann.sentAt).toLocaleString()}
                        </TableCell>

                        <TableCell className="text-xs text-slate-600">
                          {ann.sentBy}
                        </TableCell>

                        <TableCell className="text-right pr-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAnnouncement(ann);
                            }}
                            className="h-8 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg px-3"
                          >
                            Inspect <Eye className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    {filteredAnnouncements.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-48 text-center text-xs text-slate-500">
                          No broadcasts found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* ════════════════════════════════════════════════════════ */}
      {/* TAB 3: UPCOMING EVENTS & PTM (MASTER TABLE & GRID VIEW)   */}
      {/* ════════════════════════════════════════════════════════ */}
      {isEventsTab && (
        <div className="space-y-5">
          {/* Controls & Filter Bar */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CalendarIcon className="h-4.5 w-4.5 text-cyan-600" />
                  Events & Meetings Schedule ({filteredMeetings.length})
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  View and manage all scheduled parent-teacher meetings, staff assemblies, and school events
                </CardDescription>
              </div>

              {/* Timing Filter Tabs (All / Upcoming / Past) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-auto">
                <button
                  onClick={() => setEventsTimingFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    eventsTimingFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({totalEventsCount})
                </button>
                <button
                  onClick={() => setEventsTimingFilter('upcoming')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    eventsTimingFilter === 'upcoming'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Upcoming ({upcomingEventsCount})
                </button>
                <button
                  onClick={() => setEventsTimingFilter('past')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    eventsTimingFilter === 'past'
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Past ({pastEventsCount})
                </button>
              </div>
            </CardHeader>

            {/* Filter Controls Row */}
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    placeholder="Search event title, venue, organizer..."
                    value={eventsSearchTerm}
                    onChange={(e) => setEventsSearchTerm(e.target.value)}
                    className="pl-9 h-9 text-xs rounded-xl border-slate-200 bg-white"
                  />
                </div>

                <Select value={eventsTypeFilter} onValueChange={setEventsTypeFilter}>
                  <SelectTrigger className="w-full sm:w-44 h-9 text-xs rounded-xl border-slate-200 bg-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action & View Switcher Row */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (setActiveTab) {
                      setActiveTab('event-categories');
                    } else {
                      onOpenManageCategories?.();
                    }
                  }}
                  className="h-9 text-xs rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 gap-1.5 font-semibold"
                >
                  <Tag className="h-3.5 w-3.5 text-cyan-600" /> Manage Categories
                </Button>

                {/* View Switcher (Table vs Grid) */}
                <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEventsViewMode('table')}
                  className={`h-7 px-2.5 text-xs rounded-lg font-medium gap-1.5 ${
                    eventsViewMode === 'table'
                      ? 'bg-cyan-50 text-cyan-700 font-bold border border-cyan-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="h-3.5 w-3.5" /> Table View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEventsViewMode('grid')}
                  className={`h-7 px-2.5 text-xs rounded-lg font-medium gap-1.5 ${
                    eventsViewMode === 'grid'
                      ? 'bg-cyan-50 text-cyan-700 font-bold border border-cyan-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" /> Grid View
                </Button>
              </div>
            </div>
          </div>

          {/* View Mode: Master Table View */}
            {eventsViewMode === 'table' && (
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/80">
                      <TableRow className="border-b border-slate-200/80">
                        <TableHead className="font-semibold text-xs text-slate-700 pl-6">Event Title & Category</TableHead>
                        <TableHead className="font-semibold text-xs text-slate-700">Scheduled Date & Time</TableHead>
                        <TableHead className="font-semibold text-xs text-slate-700">Timing Status</TableHead>
                        <TableHead className="font-semibold text-xs text-slate-700">Target Attendees</TableHead>
                        <TableHead className="font-semibold text-xs text-slate-700">Venue / Location</TableHead>
                        <TableHead className="font-semibold text-xs text-slate-700">Organizer</TableHead>
                        <TableHead className="font-semibold text-xs text-slate-700 text-right pr-6">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMeetings.map((mtg) => {
                        const isUpcoming = isUpcomingEvent(mtg.date);
                        return (
                          <TableRow 
                            key={mtg.id} 
                            className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors cursor-pointer group"
                            onClick={() => setSelectedMeeting(mtg)}
                          >
                            <TableCell className="pl-6">
                              <div className="space-y-1">
                                <div className="font-bold text-xs text-slate-900 group-hover:text-cyan-700 transition-colors">
                                  {mtg.title}
                                </div>
                                <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 text-[10px] font-semibold px-2 py-0.5">
                                  {mtg.type}
                                </Badge>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="space-y-0.5 text-xs text-slate-700">
                                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                                  <CalendarIcon className="h-3.5 w-3.5 text-cyan-600" />
                                  {new Date(mtg.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 pl-5">
                                  <Clock className="h-3 w-3 text-slate-400" />
                                  {mtg.startTime} - {mtg.endTime}
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              {isUpcoming ? (
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-semibold flex items-center gap-1 w-fit">
                                  <CalendarCheck className="h-3 w-3 text-emerald-600" /> Upcoming
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-medium flex items-center gap-1 w-fit">
                                  <Clock className="h-3 w-3 text-slate-400" /> Past / Completed
                                </Badge>
                              )}
                            </TableCell>

                            <TableCell>
                              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border border-purple-100 text-[11px] font-medium">
                                <Users className="h-3 w-3 text-purple-500 mr-1 inline" />
                                {mtg.participants}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              {mtg.link ? (
                                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                                  <Video className="h-3.5 w-3.5 text-blue-500" />
                                  Virtual Meeting Link
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                                  <MapPin className="h-3.5 w-3.5 text-rose-500" />
                                  {mtg.location || 'School Campus'}
                                </div>
                              )}
                            </TableCell>

                            <TableCell className="text-xs text-slate-600 font-medium">
                              {mtg.organizer || 'School Administration'}
                            </TableCell>

                            <TableCell className="text-right pr-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMeeting(mtg);
                                }}
                                className="h-8 text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg px-3"
                              >
                                View Details <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}

                      {filteredMeetings.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="h-48 text-center text-xs text-slate-500">
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <CalendarIcon className="h-8 w-8 text-slate-300" />
                              <p className="font-medium text-slate-600">No events found matching your filter criteria.</p>
                              <p className="text-[11px] text-slate-400">Try changing your search term or timing filter.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            )}

            {/* View Mode: Grid View */}
            {eventsViewMode === 'grid' && (
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMeetings.map((mtg) => {
                    const isUpcoming = isUpcomingEvent(mtg.date);
                    return (
                      <div 
                        key={mtg.id} 
                        onClick={() => setSelectedMeeting(mtg)}
                        className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/30 hover:bg-slate-50/80 hover:border-cyan-300 hover:shadow-md transition-all flex gap-4 items-start cursor-pointer group"
                      >
                        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-xl p-3 h-16 w-16 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {new Date(mtg.date).toLocaleString('default', { month: 'short' })}
                          </span>
                          <span className="text-xl font-black leading-tight">
                            {new Date(mtg.date).getDate()}
                          </span>
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors">{mtg.title}</h4>
                            <div className="flex items-center gap-1.5">
                              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] font-semibold">
                                {mtg.type}
                              </Badge>
                              {isUpcoming ? (
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-semibold">
                                  Upcoming
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200 text-[10px]">
                                  Past
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-cyan-600" />
                              {mtg.startTime} - {mtg.endTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-purple-500" />
                              {mtg.participants}
                            </span>
                          </div>

                          <div className="pt-1 flex justify-between items-center">
                            {mtg.link ? (
                              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
                                <Video className="h-3.5 w-3.5 text-blue-500" />
                                Virtual Event Link <ExternalLink className="h-3 w-3" />
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                                {mtg.location || 'Main Auditorium'}
                              </div>
                            )}

                            <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg">
                              View Details →
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredMeetings.length === 0 && (
                    <div className="col-span-2 p-12 text-center text-xs text-slate-500">
                      No events found matching your filter criteria.
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════ */}
      {/* TAB 4: TEMPLATES & DELIVERY CHANNELS HUB                */}
      {/* ════════════════════════════════════════════════════════ */}
      {isTemplatesTab && (
        <div className="space-y-6">
          {/* Section 1: Pre-built Broadcast Presets */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/60 p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-amber-500" />
                  Broadcast Presets & Templates ({templates.length})
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Launch multi-channel announcements instantly or save custom standardized template presets
                </CardDescription>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Button
                  onClick={() => onOpenCreateTemplate?.()}
                  className="gradient-emerald text-white text-xs font-semibold rounded-xl h-9 px-4 gap-1.5 shadow-colored-emerald"
                >
                  <Sparkles className="h-3.5 w-3.5" /> + Create Preset Template
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((tpl) => (
                <div 
                  key={tpl.id}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{tpl.name}</h4>
                      <Badge variant="secondary" className="bg-white text-slate-700 border border-slate-200 text-[10px] font-semibold">
                        {tpl.id}
                      </Badge>
                    </div>

                    <div className="text-xs font-semibold text-slate-700 line-clamp-1">
                      {tpl.title}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/60">
                      "{tpl.body}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex gap-1">
                      {tpl.defaultChannels.map(ch => (
                        <Badge key={ch} variant="outline" className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5">
                          {ch}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => onOpenBroadcastModal?.()}
                      className="gradient-emerald text-white text-xs font-semibold rounded-xl h-8 px-3 gap-1 shadow-sm"
                    >
                      <Send className="h-3 w-3" /> Use Preset
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section 2: Delivery Channels Health Status */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/60 p-5 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Server className="h-4.5 w-4.5 text-indigo-600" />
                Delivery Gateways & Infrastructure Health
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">
                Real-time operational metrics for Email, SMS Direct, and Mobile Push infrastructure
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Email Gateway */}
              <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/30 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Email Gateway</h4>
                      <p className="text-[11px] text-slate-500">SMTP / SendGrid API</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                    Operational
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Delivery Rate</span>
                    <span className="text-base font-bold text-slate-900">99.8%</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Avg Latency</span>
                    <span className="text-base font-bold text-slate-900">1.2 sec</span>
                  </div>
                </div>
              </div>

              {/* SMS Gateway */}
              <div className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/30 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">SMS Direct Gateway</h4>
                      <p className="text-[11px] text-slate-500">Twilio Telecom API</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                    Operational
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Delivery Rate</span>
                    <span className="text-base font-bold text-slate-900">98.9%</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Avg Latency</span>
                    <span className="text-base font-bold text-slate-900">2.4 sec</span>
                  </div>
                </div>
              </div>

              {/* Mobile App Push */}
              <div className="p-5 rounded-2xl border border-purple-100 bg-purple-50/30 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">App Push Gateway</h4>
                      <p className="text-[11px] text-slate-500">Firebase Cloud Messaging</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                    Operational
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Delivery Rate</span>
                    <span className="text-base font-bold text-slate-900">99.5%</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Avg Latency</span>
                    <span className="text-base font-bold text-slate-900">0.8 sec</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════ */}
      {/* TAB 5: EVENT CATEGORIES DEDICATED MANAGEMENT TAB        */}
      {/* ════════════════════════════════════════════════════════ */}
      {isCategoriesTab && (
        <div className="space-y-6">
          {/* Top KPI Summary Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">Total Categories</span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">{categories.length}</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                <Tag className="h-5 w-5" />
              </div>
            </Card>

            <Card className="border border-indigo-100 shadow-sm bg-indigo-50/40 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-700 block">System Built-In</span>
                <span className="text-2xl font-bold text-indigo-900 mt-1 block">
                  {categories.filter(c => c.isDefault).length}
                </span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Building className="h-5 w-5" />
              </div>
            </Card>

            <Card className="border border-emerald-100 shadow-sm bg-emerald-50/40 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-700 block">Custom Categories</span>
                <span className="text-2xl font-bold text-emerald-900 mt-1 block">
                  {categories.filter(c => !c.isDefault).length}
                </span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Sparkles className="h-5 w-5" />
              </div>
            </Card>

            <Card className="border border-amber-100 shadow-sm bg-amber-50/40 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-700 block">Linked Events</span>
                <span className="text-2xl font-bold text-amber-900 mt-1 block">{meetings.length}</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <CalendarDays className="h-5 w-5" />
              </div>
            </Card>
          </div>

          {/* Main Card with Controls & Grid */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Tag className="h-4.5 w-4.5 text-cyan-600" />
                  School Event & Notice Categories ({categories.length})
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Customize event classification badges, colors, and descriptions for calendar events and PTM sessions
                </CardDescription>
              </div>

              <Button
                onClick={handleStartAddCategory}
                className="gradient-emerald text-white text-xs font-semibold rounded-xl h-9 px-4 gap-1.5 shadow-colored-emerald shrink-0"
              >
                <Plus className="h-4 w-4" /> + Create New Category
              </Button>
            </CardHeader>

            {/* Inline Creation / Edit Form Card */}
            {(isAddingCategory || editingCategory) && (
              <div className="p-5 bg-slate-50/90 border-b border-slate-200/80 animate-in fade-in slide-in-from-top-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-cyan-600" />
                    {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Event Category'}
                  </h4>
                  <Badge variant="outline" className={getCategoryBadgeClass(categoryColor)}>
                    Badge Preview: {categoryName || 'Sample Category'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Category Title / Name *</label>
                    <Input
                      placeholder="e.g. Science Fair & Exhibition"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="h-9 text-xs rounded-xl border-slate-200 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Badge Color Theme *</label>
                    <Select value={categoryColor} onValueChange={setCategoryColor}>
                      <SelectTrigger className="h-9 text-xs rounded-xl border-slate-200 bg-white">
                        <SelectValue placeholder="Select color theme..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cyan">Cyan (Sky Blue)</SelectItem>
                        <SelectItem value="indigo">Indigo (Deep Purple/Blue)</SelectItem>
                        <SelectItem value="emerald">Emerald (Vibrant Green)</SelectItem>
                        <SelectItem value="amber">Amber (Warm Gold)</SelectItem>
                        <SelectItem value="rose">Rose (Coral Red)</SelectItem>
                        <SelectItem value="purple">Purple (Royal Violet)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-semibold text-slate-700">Description / Usage Context</label>
                    <Input
                      placeholder="e.g. For annual science expos, project showcases, and STEM competitions."
                      value={categoryDescription}
                      onChange={(e) => setCategoryDescription(e.target.value)}
                      className="h-9 text-xs rounded-xl border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsAddingCategory(false);
                      setEditingCategory(null);
                    }}
                    className="h-8 text-xs rounded-xl border-slate-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveCategoryForm}
                    disabled={!categoryName.trim()}
                    className="gradient-indigo text-white text-xs font-semibold rounded-xl h-8 px-4 gap-1.5 shadow-sm"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {editingCategory ? 'Update Category' : 'Save Category'}
                  </Button>
                </div>
              </div>
            )}

            {/* Filter Search */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Search category title or description..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="pl-9 h-9 text-xs rounded-xl border-slate-200 bg-slate-50/50"
                />
              </div>

              <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs font-semibold shrink-0">
                {filteredCategories.length} Categories
              </Badge>
            </div>

            {/* Categories Cards Grid */}
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCategories.map((cat) => {
                  const linkedEventsCount = meetings.filter(m => m.type === cat.name).length;
                  return (
                    <div
                      key={cat.id}
                      className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/30 hover:bg-slate-50/90 hover:border-cyan-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="outline" className={`${getCategoryBadgeClass(cat.color)} text-xs font-bold px-2.5 py-1`}>
                            {cat.name}
                          </Badge>
                          {cat.isDefault ? (
                            <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[10px]">
                              System Built-In
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-semibold">
                              Custom
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/60 min-h-[50px]">
                          {cat.description || 'Standard school event category used for calendar events and PTM sessions.'}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                        <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5 text-cyan-600" />
                          <span>{linkedEventsCount} {linkedEventsCount === 1 ? 'event' : 'events'} linked</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStartEditCategory(cat)}
                            className="h-7 w-7 p-0 rounded-lg text-slate-500 hover:text-cyan-700 hover:bg-cyan-50"
                            title="Edit Category"
                          >
                            <Pen className="h-3.5 w-3.5" />
                          </Button>
                          
                          {!cat.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteCategory?.(cat.id)}
                              className="h-7 w-7 p-0 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                              title="Delete Category"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredCategories.length === 0 && (
                  <div className="col-span-full p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center space-y-2">
                    <Tag className="h-8 w-8 text-slate-300" />
                    <p className="font-semibold text-slate-600">No categories matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Broadcast Details Dialog */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={(open) => !open && setSelectedAnnouncement(null)}>
        <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xl space-y-4">
          <DialogHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-slate-900">Broadcast Inspection Details</DialogTitle>
                <DialogDescription className="text-xs text-slate-500">Complete record log for sent notification</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedAnnouncement && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Subject / Title</label>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedAnnouncement.title}</p>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Message Content</label>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed mt-1 whitespace-pre-wrap">
                  {selectedAnnouncement.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Audience</label>
                  <span className="font-semibold text-slate-800 mt-0.5 block">
                    {selectedAnnouncement.targetAudience}
                    {selectedAnnouncement.targetClass && selectedAnnouncement.targetClass !== 'All' && ` (Class ${selectedAnnouncement.targetClass})`}
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Timestamp</label>
                  <span className="font-semibold text-slate-800 mt-0.5 block">
                    {new Date(selectedAnnouncement.sentAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Dispatched Channels</label>
                <div className="flex gap-2 flex-wrap">
                  {selectedAnnouncement.channels.map(channel => (
                    <Badge key={channel} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-semibold px-2.5 py-1">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2 border-t border-slate-100 flex justify-end">
            <Button onClick={() => setSelectedAnnouncement(null)} className="rounded-xl h-9 text-xs px-5 border-slate-200" variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Meeting / Event Details Modal */}
      <Dialog open={!!selectedMeeting} onOpenChange={(open) => !open && setSelectedMeeting(null)}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xl space-y-4">
          <DialogHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 font-bold">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-slate-900">Event & Meeting Details</DialogTitle>
                <DialogDescription className="text-xs text-slate-500">Scheduled PTM / School assembly info</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedMeeting && (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Event Title</label>
                  <p className="text-base font-bold text-slate-900 mt-0.5">{selectedMeeting.title}</p>
                </div>
                <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 font-bold text-xs px-2.5 py-1 shrink-0">
                  {selectedMeeting.type}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3 text-cyan-600" /> Event Date
                  </span>
                  <p className="font-bold text-slate-800 text-xs">
                    {new Date(selectedMeeting.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-cyan-600" /> Time Slot
                  </span>
                  <p className="font-bold text-slate-800 text-xs">
                    {selectedMeeting.startTime} - {selectedMeeting.endTime}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Users className="h-3 w-3 text-purple-600" /> Attendees / Participants
                  </span>
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 font-semibold text-xs border border-purple-100">
                    {selectedMeeting.participants}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <UserCheck className="h-3 w-3 text-emerald-600" /> Organizer
                  </span>
                  <p className="font-semibold text-slate-700 text-xs">
                    {selectedMeeting.organizer || 'School Administration'}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 block">Venue / Meeting Location</span>
                {selectedMeeting.link ? (
                  <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold">
                      <Video className="h-4 w-4 text-blue-600" />
                      <span>Virtual Online Meeting</span>
                    </div>
                    <a 
                      href={selectedMeeting.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-mono font-semibold text-blue-600 hover:underline break-all"
                    >
                      {selectedMeeting.link}
                    </a>
                    <Button 
                      onClick={() => window.open(selectedMeeting.link, '_blank')}
                      className="gradient-indigo text-white text-xs font-semibold rounded-xl h-8 gap-1.5 mt-1 self-start px-4"
                    >
                      <Video className="h-3.5 w-3.5" /> Join Virtual Meeting Now
                    </Button>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs">{selectedMeeting.location || 'School Auditorium / Campus'}</p>
                      <p className="text-[11px] text-slate-500">In-Person Campus Session</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="pt-2 border-t border-slate-100 flex justify-end">
            <Button onClick={() => setSelectedMeeting(null)} className="rounded-xl h-9 text-xs px-5 border-slate-200" variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
