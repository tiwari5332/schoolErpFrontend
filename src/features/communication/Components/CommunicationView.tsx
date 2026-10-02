import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  CalendarPlus,
  Megaphone,
  Radio,
  BellRing,
  CalendarDays,
  TrendingUp,
  Calendar as CalendarIcon,
  ArrowRight,
  Users,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  Video,
  MapPin,
  Mail,
  Smartphone,
  ShieldCheck,
  LayoutDashboard,
  ExternalLink,
  Tag
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { useCommunication } from '../hooks/useCommunication';
import { ComposeBroadcastModal } from '../Components/ComposeBroadcastModal';
import { ScheduleMeetingModal } from '../Components/ScheduleMeetingModal';
import { CreateTemplateModal } from '../Components/CreateTemplateModal';
import { ManageEventCategoriesModal } from '../Components/ManageEventCategoriesModal';
import { CommunicationTabs } from '../Components/CommunicationTabs';

export function CommunicationView() {
  const {
    announcements,
    meetings,
    templates,
    categories,
    isLoading,
    isBroadcastOpen,
    setIsBroadcastOpen,
    isMeetingOpen,
    setIsMeetingOpen,
    isCreateTemplateOpen,
    setIsCreateTemplateOpen,
    isManageCategoriesOpen,
    setIsManageCategoriesOpen,
    handleSendBroadcast,
    handleScheduleMeeting,
    handleCreateTemplate,
    handleSaveCategory,
    handleDeleteCategory
  } = useCommunication();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [dashboardDate, setDashboardDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dashboardAudience, setDashboardAudience] = useState<string>('all');
  const [dashboardChannel, setDashboardChannel] = useState<string>('all');

  const dashboardStats = useMemo(() => {
    const totalAnnouncements = announcements.length || 6;
    const totalEvents = meetings.length || 4;
    const activeAlerts = announcements.filter(a => new Date(a.sentAt).getTime() > Date.now() - 86400000).length || 2;
    const deliveryRate = '99.4%';

    return {
      totalAnnouncements,
      totalEvents,
      activeAlerts,
      deliveryRate,
      everyoneCount: announcements.filter(a => a.targetAudience === 'All').length || 2,
      parentsCount: announcements.filter(a => a.targetAudience === 'Parents').length || 2,
      teachersCount: announcements.filter(a => a.targetAudience === 'Teachers').length || 1,
      studentsCount: announcements.filter(a => a.targetAudience === 'Students').length || 1,
    };
  }, [announcements, meetings]);

  const pieData = [
    { name: 'Global School', value: dashboardStats.everyoneCount, color: '#10b981' },
    { name: 'Parents Only', value: dashboardStats.parentsCount, color: '#38bdf8' },
    { name: 'Teachers & Staff', value: dashboardStats.teachersCount, color: '#8b5cf6' },
    { name: 'Students Roster', value: dashboardStats.studentsCount, color: '#f59e0b' },
  ];

  const TABS = [
    { id: 'dashboard', label: 'Overview & Analytics', icon: LayoutDashboard },
    { id: 'broadcasts', label: 'Broadcast Feed & Log', icon: Megaphone },
    { id: 'events', label: 'Events & PTM Schedule', icon: CalendarDays },
    { id: 'templates-channels', label: 'Templates & Channels', icon: Sparkles },
    { id: 'event-categories', label: 'Event Categories', icon: Tag },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
            <Radio className="h-6 w-6 text-emerald-600 animate-pulse" />
            Communication Hub
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            School-wide broadcasting, parent-teacher meeting scheduling, templates, and analytics
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-xs rounded-xl h-10 px-4 transition-all">
            <Download className="h-4 w-4 text-emerald-500" />
            Export Audit Log
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsCreateTemplateOpen(true)} 
            className="gap-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-xs rounded-xl h-10 px-4 transition-all"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            Create Template
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsMeetingOpen(true)} 
            className="gap-2 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 text-xs rounded-xl h-10 px-4 transition-all"
          >
            <CalendarPlus className="h-4 w-4 text-cyan-500" />
            Schedule Event
          </Button>
          <Button
            onClick={() => setIsBroadcastOpen(true)}
            className="gap-2 gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200 h-10 px-4 rounded-xl text-xs font-semibold"
          >
            <Megaphone className="h-4 w-4" />
            New Broadcast
          </Button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 gap-6 overflow-x-auto scrollbar-hide print:hidden">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-bold transition-all relative whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-white/90">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold text-lg">
                    School-Wide Communication & Dispatched Broadcast Analytics
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80 mt-2">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>Real-Time Dispatched Feed Overview</span>
                </div>
              </div>
              <Button
                onClick={() => setActiveTab('broadcasts')}
                className="bg-white font-semibold text-xs text-emerald-700 hover:bg-slate-100 shadow-md transition-all self-start sm:self-auto gap-2 rounded-xl px-4 py-2"
              >
                Go to Broadcast Feed <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl">
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-slate-400" /> Filter by Date
                </label>
                <Input
                  type="date"
                  value={dashboardDate}
                  onChange={(e) => setDashboardDate(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Target Audience</label>
                <Select value={dashboardAudience} onValueChange={setDashboardAudience}>
                  <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Target Audiences</SelectItem>
                    <SelectItem value="All">Global (Everyone)</SelectItem>
                    <SelectItem value="Parents">Parents Only</SelectItem>
                    <SelectItem value="Teachers">Teachers & Staff</SelectItem>
                    <SelectItem value="Students">Students Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Delivery Channel</label>
                <Select value={dashboardChannel} onValueChange={setDashboardChannel}>
                  <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                    <SelectValue placeholder="All Channels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Delivery Channels</SelectItem>
                    <SelectItem value="Email">Email Notice</SelectItem>
                    <SelectItem value="SMS">SMS Text</SelectItem>
                    <SelectItem value="App Push">Mobile App Push</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-900 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-teal-200">Total Broadcasts</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Megaphone className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{dashboardStats.totalAnnouncements}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-teal-300 rounded-full" style={{ width: `100%` }} />
              </div>
              <div className="mt-2 text-[11px] text-teal-200 flex justify-between">
                <span>100% Dispatched</span>
                <span>Active Feed</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-green-800 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-100">Scheduled Events</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{dashboardStats.totalEvents}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-300 rounded-full" style={{ width: `90%` }} />
              </div>
              <div className="mt-2 text-[11px] text-emerald-100 flex justify-between">
                <span>Scheduled PTMs</span>
                <span>On Calendar</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-sky-100">Active Alerts (24h)</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <BellRing className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{dashboardStats.activeAlerts}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-sky-200 rounded-full" style={{ width: `75%` }} />
              </div>
              <div className="mt-2 text-[11px] text-sky-100 flex justify-between">
                <span>High Priority</span>
                <span>Recent 24 Hours</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-100">Delivery Rate</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{dashboardStats.deliveryRate}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-purple-300 rounded-full" style={{ width: `99.4%` }} />
              </div>
              <div className="mt-2 text-[11px] text-purple-100 flex justify-between">
                <span>99.4% Delivered</span>
                <span>Multi-Channel</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg font-semibold text-slate-800">
                  Broadcast Distribution by Audience Segment
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="h-64 w-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                    <span>Global School</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-sky-400 inline-block" />
                    <span>Parents Only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-purple-600 inline-block" />
                    <span>Teachers & Staff</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
                    <span>Students Roster</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Megaphone className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Sent Broadcasts</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.totalAnnouncements}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-sky-50 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-sky-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Scheduled PTMs</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.totalEvents}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-purple-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Audience Roles</div>
                  <div className="text-2xl font-bold text-slate-800">4 Segments</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Delivery Channels</div>
                  <div className="text-2xl font-bold text-slate-800">3 Channels</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-teal-50 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-teal-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Active Alerts</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.activeAlerts}</div>
                </div>
              </Card>

              <Card className="border border-emerald-100 shadow-sm rounded-2xl p-4 bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-emerald-100">Parent Engagement</div>
                  <div className="text-2xl font-bold text-white">98.6%</div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
              <CardHeader className="p-4 bg-slate-50/60 border-b border-slate-100 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-emerald-600" />
                  <CardTitle className="text-sm font-bold text-slate-900">Recent Dispatched Feed</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab('broadcasts')}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold h-7 px-2"
                >
                  View All Feed →
                </Button>
              </CardHeader>
              <CardContent className="p-0 divide-y divide-slate-100">
                {announcements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="p-4 hover:bg-slate-50/60 transition-colors">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{ann.title}</h4>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] shrink-0">
                        {ann.targetAudience}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{ann.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
              <CardHeader className="p-4 bg-slate-50/60 border-b border-slate-100 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-cyan-600" />
                  <CardTitle className="text-sm font-bold text-slate-900">Upcoming Events Preview</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab('events')}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold h-7 px-2"
                >
                  View All Schedule →
                </Button>
              </CardHeader>
              <CardContent className="p-0 divide-y divide-slate-100">
                {meetings.slice(0, 3).map((mtg) => (
                  <div key={mtg.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-slate-900">{mtg.title}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-cyan-600" /> {mtg.startTime}</span>
                        <span>•</span>
                        <span>{mtg.participants}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 text-[10px] font-semibold shrink-0">
                      {mtg.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab !== 'dashboard' && (
        <CommunicationTabs
          announcements={announcements}
          meetings={meetings}
          templates={templates}
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenBroadcastModal={() => setIsBroadcastOpen(true)}
          onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)}
          onOpenManageCategories={() => setIsManageCategoriesOpen(true)}
          onSaveCategory={handleSaveCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}

      <ComposeBroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        onSend={handleSendBroadcast}
        templates={templates}
        onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)}
      />

      <ScheduleMeetingModal
        isOpen={isMeetingOpen}
        onClose={() => setIsMeetingOpen(false)}
        onSchedule={handleScheduleMeeting}
        categories={categories}
        onOpenManageCategories={() => setIsManageCategoriesOpen(true)}
      />

      <CreateTemplateModal
        isOpen={isCreateTemplateOpen}
        onClose={() => setIsCreateTemplateOpen(false)}
        onCreate={handleCreateTemplate}
      />

      <ManageEventCategoriesModal
        isOpen={isManageCategoriesOpen}
        onClose={() => setIsManageCategoriesOpen(false)}
        categories={categories}
        onSaveCategory={handleSaveCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
}

export default CommunicationView;
