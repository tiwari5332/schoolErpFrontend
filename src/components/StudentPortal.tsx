import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Users, 
  ClipboardCheck, 
  FileText, 
  Calendar,
  Settings,
  Home,
  Bell,
  LogOut,
  ChevronLeft,
  Menu,
  BookOpen,
  Trophy,
  Video,
  Gamepad2,
  Target,
  TrendingUp,
  Clock,
  Star,
  Award,
  Brain,
  Zap,
  CheckCircle2,
  PlayCircle,
  Download,
  Share,
  Heart,
  MessageCircle,
  Camera,
  Lightbulb
} from "lucide-react";
import { EduTrioLogo } from "./EduTrioLogo";

interface StudentPortalProps {}

export function StudentPortal({}: StudentPortalProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'gradient-indigo' },
    { id: 'classes', label: 'Live Classes', icon: Video, gradient: 'gradient-purple' },
    { id: 'assignments', label: 'Assignments', icon: FileText, gradient: 'gradient-cyan' },
    { id: 'library', label: 'Digital Library', icon: BookOpen, gradient: 'gradient-emerald' },
    { id: 'exams', label: 'Exams & Tests', icon: Brain, gradient: 'gradient-amber' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, gradient: 'gradient-rose' },
    { id: 'schedule', label: 'My Schedule', icon: Calendar, gradient: 'gradient-indigo' },
    { id: 'gaming', label: 'EduGaming', icon: Gamepad2, gradient: 'gradient-purple' },
  ];

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Mathematics', teacher: 'Ms. Sarah Wilson', type: 'live', status: 'starting-soon' },
    { time: '10:00 AM', subject: 'Physics', teacher: 'Mr. John Davis', type: 'recorded', status: 'available' },
    { time: '11:00 AM', subject: 'Chemistry', teacher: 'Mrs. Lisa Brown', type: 'live', status: 'scheduled' },
  ];

  const assignments = [
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Quadratic Equations Problem Set',
      dueDate: '2024-08-28',
      status: 'pending',
      difficulty: 'medium',
      points: 100,
      estimatedTime: '2 hours'
    },
    {
      id: '2',
      subject: 'Physics',
      title: 'Motion Lab Report',
      dueDate: '2024-08-30',
      status: 'submitted',
      difficulty: 'hard',
      points: 150,
      estimatedTime: '3 hours',
      score: 142
    },
    {
      id: '3',
      subject: 'English',
      title: 'Environmental Essay',
      dueDate: '2024-09-02',
      status: 'in-progress',
      difficulty: 'easy',
      points: 75,
      estimatedTime: '1.5 hours'
    }
  ];

  const digitalBooks = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      author: 'Dr. R.S. Aggarwal',
      subject: 'Mathematics',
      progress: 65,
      totalPages: 450,
      currentPage: 293,
      category: 'Textbook'
    },
    {
      id: '2',
      title: 'Physics Fundamentals',
      author: 'H.C. Verma',
      subject: 'Physics',
      progress: 42,
      totalPages: 520,
      currentPage: 218,
      category: 'Reference'
    },
    {
      id: '3',
      title: 'Environmental Science',
      author: 'Dr. Sharma',
      subject: 'Environmental Science',
      progress: 78,
      totalPages: 280,
      currentPage: 218,
      category: 'Textbook'
    }
  ];

  const gamificationData = {
    level: 15,
    experience: 2850,
    nextLevelExp: 3000,
    streakDays: 12,
    badges: [
      { name: 'Math Master', icon: '🧮', earned: true, description: 'Solved 100 math problems' },
      { name: 'Perfect Attendance', icon: '⭐', earned: true, description: '30 days perfect attendance' },
      { name: 'Quick Learner', icon: '⚡', earned: true, description: 'Completed 5 courses in a week' },
      { name: 'Team Player', icon: '🤝', earned: false, description: 'Participate in 10 group projects' },
    ],
    weeklyGoals: [
      { task: 'Complete 5 assignments', progress: 3, target: 5 },
      { task: 'Read 50 pages', progress: 32, target: 50 },
      { task: 'Attend all classes', progress: 4, target: 6 },
    ]
  };

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome back, Emma! 🎓
          </h1>
          <p className="text-slate-600 mt-2">Ready to continue your learning journey?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-900">Level {gamificationData.level}</div>
            <div className="text-sm text-slate-600">Learning Level</div>
          </div>
          <div className="w-16 h-16 rounded-full gradient-indigo flex items-center justify-center text-white text-2xl font-bold">
            {gamificationData.level}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card border-0 shadow-xl hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-emerald flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-900">94%</p>
                <p className="text-sm text-slate-600">Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-xl hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-indigo flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-900">86</p>
                <p className="text-sm text-slate-600">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-xl hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-amber flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-900">5th</p>
                <p className="text-sm text-slate-600">Class Rank</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-xl hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-purple flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">{gamificationData.streakDays}</p>
                <p className="text-sm text-slate-600">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <Calendar className="h-5 w-5" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    class_.status === 'starting-soon' ? 'bg-red-500 animate-pulse' :
                    class_.status === 'available' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}></div>
                  <div>
                    <p className="font-medium text-slate-900">{class_.time}</p>
                    <p className="text-sm text-slate-600">{class_.subject}</p>
                    <p className="text-xs text-slate-500">{class_.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {class_.type === 'live' && <Video className="h-4 w-4 text-red-500" />}
                  <Button size="sm" className={
                    class_.status === 'starting-soon' ? "gradient-red text-white" :
                    class_.status === 'available' ? "gradient-emerald text-white" :
                    "gradient-indigo text-white"
                  }>
                    {class_.status === 'starting-soon' ? 'Join Now' :
                     class_.status === 'available' ? 'Watch' : 'Scheduled'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <Target className="h-5 w-5" />
              Weekly Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gamificationData.weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{goal.task}</span>
                  <span className="text-xs text-slate-500">{goal.progress}/{goal.target}</span>
                </div>
                <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
              </div>
            ))}
            <div className="pt-2">
              <p className="text-sm text-slate-600">Complete goals to earn XP and unlock rewards!</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-emerald-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full gradient-emerald text-white shadow-colored-emerald justify-start">
              <BookOpen className="h-4 w-4 mr-3" />
              Continue Reading
            </Button>
            <Button className="w-full gradient-indigo text-white shadow-colored-indigo justify-start">
              <FileText className="h-4 w-4 mr-3" />
              Submit Assignment
            </Button>
            <Button className="w-full gradient-purple text-white shadow-colored-purple justify-start">
              <Brain className="h-4 w-4 mr-3" />
              Practice Test
            </Button>
            <Button className="w-full gradient-amber text-white shadow-colored-amber justify-start">
              <Gamepad2 className="h-4 w-4 mr-3" />
              Play Learning Game
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Experience Progress */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <Zap className="h-5 w-5" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Level {gamificationData.level} Progress</span>
              <span className="text-sm text-slate-600">{gamificationData.experience}/{gamificationData.nextLevelExp} XP</span>
            </div>
            <Progress value={(gamificationData.experience / gamificationData.nextLevelExp) * 100} className="h-3" />
            <div className="grid grid-cols-4 gap-3">
              {gamificationData.badges.map((badge, index) => (
                <div key={index} className={`text-center p-3 rounded-xl ${
                  badge.earned ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50 border border-slate-200 opacity-50'
                }`}>
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-medium text-slate-700">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLibrary = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Digital Library 📚
        </h2>
        <Button className="gradient-emerald text-white shadow-colored-emerald">
          <Camera className="h-4 w-4 mr-2" />
          Scan Book
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {digitalBooks.map((book) => (
            <Card key={book.id} className="glass-card border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-16 rounded-lg gradient-emerald flex items-center justify-center text-white text-xs font-bold">
                    BOOK
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{book.title}</h3>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        {book.category}
                      </Badge>
                    </div>
                    <p className="text-emerald-600 font-medium mb-1">{book.subject}</p>
                    <p className="text-slate-600 mb-3">by {book.author}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-medium">{book.progress}% • Page {book.currentPage}/{book.totalPages}</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button className="gradient-emerald text-white flex-1">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Reading
                      </Button>
                      <Button variant="outline" className="hover:bg-emerald-50">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reading Stats */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-emerald-900">Reading Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-xl bg-emerald-50">
              <div className="text-3xl font-bold text-emerald-900">127</div>
              <div className="text-sm text-emerald-700">Pages This Week</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-indigo-50">
                <div className="text-xl font-bold text-indigo-900">3</div>
                <div className="text-xs text-indigo-700">Books Active</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-amber-50">
                <div className="text-xl font-bold text-amber-900">8</div>
                <div className="text-xs text-amber-700">Books Completed</div>
              </div>
            </div>
            <Button className="w-full gradient-emerald text-white">
              <Lightbulb className="h-4 w-4 mr-2" />
              Get Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
        My Assignments ✍️
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="glass-card border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    assignment.status === 'submitted' ? 'gradient-emerald' :
                    assignment.status === 'in-progress' ? 'gradient-amber' :
                    assignment.difficulty === 'hard' ? 'gradient-rose' : 'gradient-indigo'
                  }`}>
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">{assignment.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          assignment.status === 'submitted' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          assignment.status === 'in-progress' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }>
                          {assignment.status === 'submitted' ? 'Submitted' : 
                           assignment.status === 'in-progress' ? 'In Progress' : 'Pending'}
                        </Badge>
                        {assignment.score && (
                          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                            {assignment.score}/{assignment.points} pts
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-cyan-600 font-medium mb-2">{assignment.subject}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-slate-500">Due Date:</span>
                        <p className="font-medium">{assignment.dueDate}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Points:</span>
                        <p className="font-medium">{assignment.points} pts</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Est. Time:</span>
                        <p className="font-medium">{assignment.estimatedTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {assignment.status === 'submitted' ? (
                        <Button variant="outline" className="flex-1 hover:bg-emerald-50">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          View Submission
                        </Button>
                      ) : (
                        <Button className="gradient-cyan text-white flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          {assignment.status === 'in-progress' ? 'Continue' : 'Start Assignment'}
                        </Button>
                      )}
                      <Button variant="outline" className="hover:bg-slate-50">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assignment Summary */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-cyan-900">Assignment Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-xl bg-cyan-50">
              <div className="text-3xl font-bold text-cyan-900">3</div>
              <div className="text-sm text-cyan-700">Active Assignments</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-emerald-50">
                <div className="text-xl font-bold text-emerald-900">1</div>
                <div className="text-xs text-emerald-700">Completed</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-red-50">
                <div className="text-xl font-bold text-red-900">2</div>
                <div className="text-xs text-red-700">Pending</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Weekly Progress</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <Button className="w-full gradient-cyan text-white">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'library': return renderLibrary();
      case 'assignments': return renderAssignments();
      case 'classes': return (
        <div className="p-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Live Virtual Classrooms 🎥
          </h2>
          <p className="text-slate-600">Interactive live classes coming soon...</p>
        </div>
      );
      case 'exams': return (
        <div className="p-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Exams & Practice Tests 🧠
          </h2>
          <p className="text-slate-600">Online examination system coming soon...</p>
        </div>
      );
      case 'achievements': return (
        <div className="p-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Achievements 🏆
          </h2>
          <p className="text-slate-600">Achievement showcase coming soon...</p>
        </div>
      );
      case 'gaming': return (
        <div className="p-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            EduGaming Zone 🎮
          </h2>
          <p className="text-slate-600">Educational games and challenges coming soon...</p>
        </div>
      );
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex">
      {/* Sidebar */}
      <div className={`bg-white/80 backdrop-blur-xl border-r border-white/20 transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      } flex flex-col shadow-xl`}>
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <EduTrioLogo size="sm" />
                <div>
                  <h1 className="font-bold text-indigo-900">EduTrio</h1>
                  <p className="text-xs text-slate-600">Student Portal</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Student Profile */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-indigo-200">
              <AvatarImage src="/placeholder-student.jpg" />
              <AvatarFallback className="gradient-indigo text-white font-medium">
                EJ
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-indigo-900 truncate">Emma Johnson</h3>
                <p className="text-sm text-slate-600 truncate">Class 10-A • Roll No: 005</p>
                <Badge className="mt-1 bg-indigo-100 text-indigo-800 border-indigo-200">
                  Level {gamificationData.level} Learner
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${
                activeTab === item.id
                  ? `${item.gradient} text-white shadow-lg hover:scale-[1.02]`
                  : 'hover:bg-white/50 text-slate-700 hover:text-indigo-600'
              } ${sidebarCollapsed ? 'px-3' : 'px-4'}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-white' : ''}`} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/20 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-slate-600 hover:text-slate-800 hover:bg-white/50 ${
              sidebarCollapsed ? 'px-3' : 'px-4'
            }`}
          >
            <Bell className="h-5 w-5" />
            {!sidebarCollapsed && <span>Notifications</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-slate-600 hover:text-slate-800 hover:bg-white/50 ${
              sidebarCollapsed ? 'px-3' : 'px-4'
            }`}
          >
            <Settings className="h-5 w-5" />
            {!sidebarCollapsed && <span>Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 ${
              sidebarCollapsed ? 'px-3' : 'px-4'
            }`}
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}