import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Bell, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  AlertCircle,
  CheckCircle,
  Info,
  Star,
  Clock,
  Eye,
  MoreHorizontal,
  Filter,
  Search,
  Sparkles
} from "lucide-react";
import { Input } from "./ui/input";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'academic',
    title: 'Mathematics Test Results Published',
    message: 'Alice scored 95% in the recent Mathematics test. Excellent performance!',
    time: '2 hours ago',
    priority: 'high',
    read: false,
    sender: 'Ms. Sarah Wilson',
    senderRole: 'Mathematics Teacher',
    avatar: ''
  },
  {
    id: 2,
    type: 'attendance',
    title: 'Perfect Attendance Achievement',
    message: 'Congratulations! Alice has maintained 100% attendance for the month of June.',
    time: '1 day ago',
    priority: 'medium',
    read: false,
    sender: 'School Administration',
    senderRole: 'Admin Office',
    avatar: ''
  },
  {
    id: 3,
    type: 'event',
    title: 'Parent-Teacher Meeting Scheduled',
    message: 'Your meeting with Alice\'s class teacher is scheduled for July 15th at 2:00 PM.',
    time: '2 days ago',
    priority: 'high',
    read: true,
    sender: 'Mr. John Davis',
    senderRole: 'Class Teacher',
    avatar: ''
  },
  {
    id: 4,
    type: 'assignment',
    title: 'Science Project Submission Reminder',
    message: 'Reminder: Science project on "Solar System" is due on July 20th. Please ensure Alice completes it on time.',
    time: '3 days ago',
    priority: 'medium',
    read: true,
    sender: 'Dr. Emily Carter',
    senderRole: 'Science Teacher',
    avatar: ''
  },
  {
    id: 5,
    type: 'announcement',
    title: 'School Holiday Notification',
    message: 'School will remain closed on July 18th due to national holiday. Regular classes will resume on July 19th.',
    time: '5 days ago',
    priority: 'low',
    read: true,
    sender: 'School Administration',
    senderRole: 'Principal Office',
    avatar: ''
  },
  {
    id: 6,
    type: 'academic',
    title: 'Quarterly Report Card Available',
    message: 'Alice\'s quarterly report card is now available for download from the parent portal.',
    time: '1 week ago',
    priority: 'medium',
    read: true,
    sender: 'School Administration',
    senderRole: 'Academic Office',
    avatar: ''
  }
];

const announcements = [
  {
    id: 1,
    title: 'Summer Vacation Reading Program',
    message: 'Encourage your child to participate in our summer reading program. A list of recommended books is available.',
    date: 'July 10, 2024',
    category: 'Academic',
    important: true
  },
  {
    id: 2,
    title: 'New School Transport Route',
    message: 'We are introducing a new transport route covering the downtown area. Registration is now open.',
    date: 'July 8, 2024',
    category: 'Transport',
    important: false
  },
  {
    id: 3,
    title: 'Health and Safety Guidelines',
    message: 'Updated health and safety guidelines for the upcoming term. Please review the attached document.',
    date: 'July 5, 2024',
    category: 'Health',
    important: true
  }
];

export function ParentNotifications() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || notification.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <BookOpen className="h-5 w-5 text-indigo-500" />;
      case 'attendance':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'assignment':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'announcement':
        return <Bell className="h-5 w-5 text-cyan-500" />;
      default:
        return <Info className="h-5 w-5 text-slate-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Notifications & Announcements
          </h2>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            Stay updated with your child's school activities
          </p>
        </div>
        <div className="flex gap-3">
          <Badge className="bg-rose-100 text-rose-800 border-rose-200 gap-2">
            <Bell className="h-3 w-3" />
            {unreadCount} unread
          </Badge>
          <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200">
            <Eye className="h-4 w-4 text-indigo-500" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
          <div className="absolute inset-0 gradient-indigo opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700 mb-1">Total Notifications</p>
                <p className="text-3xl font-bold text-indigo-900">{notifications.length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-0 shadow-colored-rose hover-lift">
          <div className="absolute inset-0 gradient-rose opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-rose-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-rose-700 mb-1">Unread Messages</p>
                <p className="text-3xl font-bold text-rose-900">{unreadCount}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-rose flex items-center justify-center shadow-colored-rose">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
          <div className="absolute inset-0 gradient-emerald opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700 mb-1">This Week</p>
                <p className="text-3xl font-bold text-emerald-900">4</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
          <div className="absolute inset-0 gradient-purple opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">High Priority</p>
                <p className="text-3xl font-bold text-purple-900">2</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Notifications and Announcements */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Personal Notifications
          </TabsTrigger>
          <TabsTrigger value="announcements" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            School Announcements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters */}
          <Card className="border-0 shadow-xl hover-lift glass-card">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 border-2 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 transition-all duration-200"
                  />
                </div>
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-11 px-4 border-2 border-slate-200 rounded-md focus:border-indigo-300 focus:ring-indigo-100 transition-all duration-200"
                >
                  <option value="all">All Types</option>
                  <option value="academic">Academic</option>
                  <option value="attendance">Attendance</option>
                  <option value="event">Events</option>
                  <option value="assignment">Assignments</option>
                  <option value="announcement">Announcements</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card className="border-0 shadow-xl hover-lift glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Recent Notifications ({filteredNotifications.length})
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">Stay updated with your child's progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                    !notification.read 
                      ? 'bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-indigo-200' 
                      : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                        !notification.read ? 'bg-indigo-100' : 'bg-slate-100'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-medium ${
                              !notification.read ? 'text-slate-900' : 'text-slate-700'
                            }`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse-slow"></div>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback className="gradient-indigo text-white text-xs">
                                  {notification.sender.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-slate-500">
                                {notification.sender} • {notification.senderRole}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{notification.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <Card className="border-0 shadow-xl hover-lift glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                School Announcements
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">Important updates from the school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-4 rounded-xl border bg-gradient-to-r from-cyan-50/30 to-blue-50/30 border-cyan-200 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-slate-900">{announcement.title}</h3>
                        {announcement.important && (
                          <Badge className="bg-rose-100 text-rose-800 border-rose-200 gap-1">
                            <Star className="h-3 w-3" />
                            Important
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{announcement.message}</p>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {announcement.category}
                        </Badge>
                        <span className="text-xs text-slate-500">{announcement.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-cyan-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}