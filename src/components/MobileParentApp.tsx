import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { 
  Home, 
  ClipboardCheck, 
  FileText, 
  Bell,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  GraduationCap,
  Star,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
  Camera,
  CreditCard,
  Bus,
  UtensilsCrossed,
  Users,
  MapPin,
  DollarSign,
  Send,
  Image,
  Trophy,
  Heart,
  Shield,
  CalendarDays,
  Wallet,
  School
} from "lucide-react";
import { EduTrioLogo } from "./EduTrioLogo";

interface MobileParentAppProps {}

export function MobileParentApp({}: MobileParentAppProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [messageText, setMessageText] = useState('');

  const studentData = {
    name: 'Emma Johnson',
    class: '10-A',
    rollNumber: '005',
    avatar: '/placeholder-student.jpg'
  };

  const teacherChats = [
    {
      id: '1',
      teacher: 'Ms. Sarah Wilson',
      subject: 'Mathematics',
      lastMessage: 'Emma did excellent work on her algebra test!',
      time: '2 hours ago',
      unread: 2,
      avatar: '/teacher1.jpg'
    },
    {
      id: '2', 
      teacher: 'Mr. John Davis',
      subject: 'Physics',
      lastMessage: 'Please ensure Emma brings her lab notebook tomorrow.',
      time: '1 day ago',
      unread: 0,
      avatar: '/teacher2.jpg'
    }
  ];

  const homeworkItems = [
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Quadratic Equations - Chapter 4',
      dueDate: '2024-08-28',
      status: 'pending',
      priority: 'high',
      description: 'Complete exercises 1-15 from page 87'
    },
    {
      id: '2',
      subject: 'Physics', 
      title: 'Lab Report - Motion Experiment',
      dueDate: '2024-08-30',
      status: 'submitted',
      priority: 'medium',
      description: 'Write a detailed report on the motion experiment conducted in class'
    },
    {
      id: '3',
      subject: 'English',
      title: 'Essay - Environmental Conservation',
      dueDate: '2024-09-02',
      status: 'pending',
      priority: 'low',
      description: '500-word essay on environmental conservation methods'
    }
  ];

  const photoGallery = [
    {
      id: '1',
      title: 'Science Fair 2024',
      date: '2024-08-25',
      photos: 12,
      thumbnail: '/science-fair.jpg',
      category: 'Academic Events'
    },
    {
      id: '2',
      title: 'Sports Day Activities',
      date: '2024-08-20',
      photos: 25,
      thumbnail: '/sports-day.jpg',
      category: 'Sports'
    },
    {
      id: '3',
      title: 'Art & Craft Exhibition',
      date: '2024-08-15',
      photos: 18,
      thumbnail: '/art-exhibition.jpg',
      category: 'Arts'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Mathematics Excellence Award',
      description: 'Top performer in Mathematics Mid-term exam',
      date: '2024-08-25',
      category: 'Academic',
      icon: '🏆',
      color: 'gradient-amber'
    },
    {
      id: '2',
      title: 'Perfect Attendance',
      description: 'No absences for the entire month',
      date: '2024-08-01',
      category: 'Attendance',
      icon: '⭐',
      color: 'gradient-emerald'
    },
    {
      id: '3',
      title: 'Science Project Winner',
      description: 'First place in class science project competition',
      date: '2024-07-28',
      category: 'Competition',
      icon: '🔬',
      color: 'gradient-indigo'
    }
  ];

  const schoolEvents = [
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      date: '2024-08-30',
      time: '3:00 PM',
      type: 'meeting',
      location: 'School Auditorium',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Annual Sports Day',
      date: '2024-09-05',
      time: '9:00 AM',
      type: 'event',
      location: 'School Playground',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Science Exhibition',
      date: '2024-09-10',
      time: '10:00 AM',
      type: 'exhibition',
      location: 'Science Lab',
      priority: 'medium'
    }
  ];

  const feeDetails = {
    totalFees: 15000,
    paidAmount: 10000,
    pendingAmount: 5000,
    nextDueDate: '2024-09-15',
    transactions: [
      { date: '2024-08-01', amount: 5000, description: 'Tuition Fee - August', status: 'paid' },
      { date: '2024-07-01', amount: 5000, description: 'Tuition Fee - July', status: 'paid' },
      { date: '2024-06-01', amount: 5000, description: 'Annual Fee', status: 'paid' }
    ]
  };

  const renderHeader = () => (
    <div className="bg-white/90 backdrop-blur-xl border-b border-white/20 p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <EduTrioLogo size="sm" />
          <div>
            <h1 className="font-bold text-emerald-900">EduTrio</h1>
            <p className="text-xs text-slate-600">Parent Mobile</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-600 hover:text-emerald-600 relative"
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </Button>
          <Avatar className="h-8 w-8 border-2 border-emerald-200">
            <AvatarImage src="/placeholder-parent.jpg" />
            <AvatarFallback className="gradient-emerald text-white text-xs font-medium">
              MJ
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="p-4 space-y-6 pb-24">
      {/* Student Info */}
      <Card className="glass-card border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-emerald-200">
              <AvatarImage src={studentData.avatar} />
              <AvatarFallback className="gradient-emerald text-white font-medium">
                {studentData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-900">{studentData.name}</h3>
              <p className="text-slate-600">Class {studentData.class}</p>
              <p className="text-sm text-slate-500">Roll No: {studentData.rollNumber}</p>
            </div>
            <div className="text-right">
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-2">
                Active
              </Badge>
              <p className="text-xs text-slate-600">Academic Year 2024-25</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-xl gradient-emerald flex items-center justify-center">
                <ClipboardCheck className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Attendance</span>
            </div>
            <p className="text-2xl font-bold text-emerald-900">94%</p>
            <p className="text-xs text-emerald-600">↑ This week</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-xl gradient-indigo flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Avg Score</span>
            </div>
            <p className="text-2xl font-bold text-indigo-900">86</p>
            <p className="text-xs text-indigo-600">Last 4 tests</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-xl gradient-amber flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Rank</span>
            </div>
            <p className="text-2xl font-bold text-amber-900">5th</p>
            <p className="text-xs text-amber-600">In class</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-xl gradient-purple flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Homework</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">2</p>
            <p className="text-xs text-purple-600">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          className="gradient-emerald text-white shadow-colored-emerald h-12"
          onClick={() => setActiveTab('chat')}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Teacher Chat
        </Button>
        <Button 
          className="gradient-indigo text-white shadow-colored-indigo h-12"
          onClick={() => setActiveTab('homework')}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Homework
        </Button>
        <Button 
          className="gradient-purple text-white shadow-colored-purple h-12"
          onClick={() => setActiveTab('photos')}
        >
          <Camera className="h-4 w-4 mr-2" />
          Photos
        </Button>
        <Button 
          className="gradient-amber text-white shadow-colored-amber h-12"
          onClick={() => setActiveTab('fees')}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Pay Fees
        </Button>
      </div>

      {/* Latest Updates */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-emerald-900">
            <Bell className="h-5 w-5" />
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
            <div className="h-8 w-8 rounded-lg gradient-amber flex items-center justify-center">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900 text-sm">New Achievement!</p>
              <p className="text-xs text-slate-600">Emma won Mathematics Excellence Award</p>
            </div>
            <span className="text-xs text-slate-500">2h ago</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
            <div className="h-8 w-8 rounded-lg gradient-indigo flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900 text-sm">New Homework</p>
              <p className="text-xs text-slate-600">Mathematics - Quadratic Equations</p>
            </div>
            <span className="text-xs text-slate-500">1d ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChat = () => (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-xl font-bold text-emerald-900">Teacher Communication</h2>
      
      <div className="space-y-3">
        {teacherChats.map((chat) => (
          <Card key={chat.id} className="glass-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-white">
                  <AvatarFallback className="gradient-emerald text-white text-sm">
                    {chat.teacher.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900 text-sm">{chat.teacher}</p>
                    <span className="text-xs text-slate-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-1">{chat.subject}</p>
                  <p className="text-sm text-slate-700">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <Badge className="bg-emerald-500 text-white">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Message */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900">Send Quick Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/50">
            <option>Select Teacher</option>
            <option>Ms. Sarah Wilson - Mathematics</option>
            <option>Mr. John Davis - Physics</option>
            <option>Mrs. Lisa Brown - Chemistry</option>
          </select>
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-white/50"
            />
            <Button className="gradient-emerald text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHomework = () => (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-xl font-bold text-indigo-900">Homework & Assignments</h2>
      
      <div className="space-y-3">
        {homeworkItems.map((item) => (
          <Card key={item.id} className="glass-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  item.status === 'submitted' ? 'gradient-emerald' : 
                  item.priority === 'high' ? 'gradient-rose' :
                  item.priority === 'medium' ? 'gradient-amber' : 'gradient-indigo'
                }`}>
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-slate-900 text-sm">{item.title}</p>
                    <Badge className={
                      item.status === 'submitted' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                      'bg-amber-100 text-amber-800 border-amber-200'
                    }>
                      {item.status === 'submitted' ? 'Submitted' : 'Pending'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mb-1">{item.subject}</p>
                  <p className="text-sm text-slate-700 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Due: {item.dueDate}</span>
                    <Badge className={
                      item.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                      item.priority === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      'bg-blue-100 text-blue-800 border-blue-200'
                    }>
                      {item.priority} priority
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-xl font-bold text-purple-900">School Photo Gallery</h2>
      
      <div className="space-y-3">
        {photoGallery.map((album) => (
          <Card key={album.id} className="glass-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-lg gradient-purple flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{album.title}</p>
                  <p className="text-xs text-slate-600 mb-1">{album.category}</p>
                  <p className="text-xs text-slate-500">📅 {album.date}</p>
                  <p className="text-xs text-purple-600">📷 {album.photos} photos</p>
                </div>
                <Button size="sm" className="gradient-purple text-white">
                  <Image className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-xl font-bold text-amber-900">Achievements & Awards</h2>
      
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="glass-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-xl ${achievement.color} flex items-center justify-center text-xl`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{achievement.title}</p>
                  <p className="text-xs text-slate-600 mb-1">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">📅 {achievement.date}</span>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      {achievement.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFees = () => (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-xl font-bold text-cyan-900">Fee Management</h2>
      
      {/* Fee Overview */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900">Fee Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total Annual Fees</span>
              <span className="font-bold text-slate-900">₹{feeDetails.totalFees}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Paid Amount</span>
              <span className="font-bold text-emerald-600">₹{feeDetails.paidAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Pending Amount</span>
              <span className="font-bold text-red-600">₹{feeDetails.pendingAmount}</span>
            </div>
            <Progress value={(feeDetails.paidAmount / feeDetails.totalFees) * 100} className="h-2" />
            <div className="text-center">
              <p className="text-sm text-slate-600">Next due date: {feeDetails.nextDueDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Pay */}
      <Card className="glass-card border-0 shadow-lg">
        <CardContent className="p-4">
          <Button className="w-full gradient-cyan text-white shadow-colored-cyan h-12">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay Pending Fees - ₹{feeDetails.pendingAmount}
          </Button>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {feeDetails.transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/50">
              <div>
                <p className="font-medium text-slate-900 text-sm">{transaction.description}</p>
                <p className="text-xs text-slate-600">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">₹{transaction.amount}</p>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderEvents = () => (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-xl font-bold text-indigo-900">School Events & Calendar</h2>
      
      <div className="space-y-3">
        {schoolEvents.map((event) => (
          <Card key={event.id} className="glass-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                  event.type === 'meeting' ? 'gradient-indigo' :
                  event.type === 'event' ? 'gradient-emerald' : 'gradient-purple'
                }`}>
                  {event.type === 'meeting' ? <Users className="h-5 w-5 text-white" /> :
                   event.type === 'event' ? <Calendar className="h-5 w-5 text-white" /> :
                   <School className="h-5 w-5 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{event.title}</p>
                  <p className="text-xs text-slate-600">📅 {event.date} at {event.time}</p>
                  <p className="text-xs text-slate-500">📍 {event.location}</p>
                </div>
                <Badge className={
                  event.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                  'bg-blue-100 text-blue-800 border-blue-200'
                }>
                  {event.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'chat': return renderChat();
      case 'homework': return renderHomework();
      case 'photos': return renderPhotos();
      case 'achievements': return renderAchievements();
      case 'fees': return renderFees();
      case 'events': return renderEvents();
      case 'attendance': return (
        <div className="p-4 pb-24">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">Attendance Record</h2>
          <p className="text-slate-600">Detailed attendance view coming soon...</p>
        </div>
      );
      case 'tests': return (
        <div className="p-4 pb-24">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">Test Results</h2>
          <p className="text-slate-600">Test results view coming soon...</p>
        </div>
      );
      case 'notifications': return (
        <div className="p-4 pb-24">
          <h2 className="text-xl font-bold text-amber-900 mb-4">Notifications</h2>
          <p className="text-slate-600">Notifications view coming soon...</p>
        </div>
      );
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col">
      {/* Header */}
      {renderHeader()}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-white/20 p-2 fixed bottom-0 left-0 right-0">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'home' ? 'text-emerald-600' : 'text-slate-600'
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="text-xs">Home</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'chat' ? 'text-emerald-600' : 'text-slate-600'
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">Chat</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('homework')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'homework' ? 'text-indigo-600' : 'text-slate-600'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">Tasks</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('photos')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'photos' ? 'text-purple-600' : 'text-slate-600'
            }`}
          >
            <Camera className="h-4 w-4" />
            <span className="text-xs">Photos</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('fees')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'fees' ? 'text-cyan-600' : 'text-slate-600'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span className="text-xs">Fees</span>
          </Button>
        </div>
      </div>
    </div>
  );
}