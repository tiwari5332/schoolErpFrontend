import React, { useState } from 'react';
import { AdminDashboard } from "./components/AdminDashboard";
import { ParentPortal } from "./components/ParentPortal";
import { TeacherPortal } from "./components/TeacherPortal";
import { StudentPortal } from "./components/StudentPortal";
import { MobileTeacherApp } from "./components/MobileTeacherApp";
import { MobileParentApp } from "./components/MobileParentApp";
import { AIAnalyticsDashboard } from "./components/AIAnalyticsDashboard";
import { AuthPage } from "./components/AuthPage";
import { LandingPage } from "./components/LandingPage";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card, CardContent } from "./components/ui/card";
import { Users, GraduationCap, BookOpen, Sparkles, ArrowRight, Smartphone, Monitor, MessageCircle, Camera, CreditCard, Trophy, Heart, Calendar, Brain, Gamepad2, Video, Target, Wallet, TrendingUp } from "lucide-react";
import { EduTrioLogo } from "./components/EduTrioLogo";

export default function App() {
  const [currentPortal, setCurrentPortal] = useState<'admin' | 'parent' | 'teacher' | 'student' | 'mobile-teacher' | 'mobile-parent' | 'ai-analytics' | 'finance' | 'selection'>('selection');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  // Show landing page first
  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  if (currentPortal === 'admin') {
    return <AdminDashboard />;
  }

  if (currentPortal === 'parent') {
    return <ParentPortal />;
  }

  if (currentPortal === 'teacher') {
    return <TeacherPortal />;
  }

  if (currentPortal === 'student') {
    return <StudentPortal />;
  }

  if (currentPortal === 'mobile-teacher') {
    return <MobileTeacherApp />;
  }

  if (currentPortal === 'mobile-parent') {
    return <MobileParentApp />;
  }

  if (currentPortal === 'ai-analytics') {
    return <AIAnalyticsDashboard />;
  }

  // Portal Selection Screen
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative animate-float">
              <EduTrioLogo size="xl" className="drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Welcome to EduTrio
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The most advanced education management platform with AI-powered insights, gamified learning, and comprehensive school management capabilities.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Admin Portal Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer" 
                onClick={() => setCurrentPortal('admin')}>
            <div className="absolute inset-0 gradient-indigo opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 gap-1">
                  <Sparkles className="h-3 w-3" />
                  Admin
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Admin Portal</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Comprehensive system management with full administrative control and advanced analytics.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span>Student & Teacher Management</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span>AI Analytics & Reports</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span>System Administration</span>
                </div>
              </div>
              
              <Button className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200 group">
                <span>Access Admin Portal</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Portal Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer"
                onClick={() => setCurrentPortal('teacher')}>
            <div className="absolute inset-0 gradient-purple opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 gap-1">
                  <Sparkles className="h-3 w-3" />
                  Teacher
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold text-purple-900 mb-3">Teacher Portal</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Advanced tools for educators with virtual classrooms and intelligent grading systems.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span>Smart Attendance & Grading</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span>Virtual Classroom Integration</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span>Performance Analytics</span>
                </div>
              </div>
              
              <Button className="w-full gradient-purple text-white shadow-colored-purple hover:scale-[1.02] transition-all duration-200 group">
                <span>Access Teacher Portal</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
          </Card>

          {/* NEW: Student Portal Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer"
                onClick={() => setCurrentPortal('student')}>
            <div className="absolute inset-0 gradient-cyan opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl gradient-cyan flex items-center justify-center shadow-colored-cyan group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 gap-1">
                  <Gamepad2 className="h-3 w-3" />
                  Student
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold text-cyan-900 mb-3">Student Portal</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Gamified learning experience with AI-powered study recommendations and virtual classrooms.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Video className="w-3 h-3 text-cyan-500" />
                  <span>Live Virtual Classes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <BookOpen className="w-3 h-3 text-cyan-500" />
                  <span>Digital Library & Resources</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Gamepad2 className="w-3 h-3 text-cyan-500" />
                  <span>Gamified Learning & Achievements</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Brain className="w-3 h-3 text-cyan-500" />
                  <span>AI Study Assistant</span>
                </div>
              </div>
              
              <Button className="w-full gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-all duration-200 group">
                <span>Access Student Portal</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Parent Portal Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer"
                onClick={() => setCurrentPortal('parent')}>
            <div className="absolute inset-0 gradient-emerald opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1">
                  <Heart className="h-3 w-3" />
                  Parent
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold text-emerald-900 mb-3">Parent Portal</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Complete parental engagement with real-time communication and comprehensive tracking.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MessageCircle className="w-3 h-3 text-emerald-500" />
                  <span>Direct Teacher Communication</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Camera className="w-3 h-3 text-emerald-500" />
                  <span>Photo Gallery & Memories</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Trophy className="w-3 h-3 text-emerald-500" />
                  <span>Achievement Showcase</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CreditCard className="w-3 h-3 text-emerald-500" />
                  <span>Online Fee Management</span>
                </div>
              </div>
              
              <Button className="w-full gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200 group">
                <span>Access Parent Portal</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Features Section */}
        <div className="border-t border-slate-200 pt-12 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">🚀 Advanced Features</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Cutting-edge technology features that set EduTrio apart from traditional school management systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Finance Portal */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer"
                  onClick={() => setCurrentPortal('finance')}>
              <div className="absolute inset-0 gradient-amber opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber group-hover:scale-110 transition-transform duration-300">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200 gap-1">
                    <TrendingUp className="h-3 w-3" />
                    AI Finance
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-amber-900 mb-3">Finance Portal</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  Smart financial management with AI-powered categorization, budget tracking, and predictive insights for better money management.
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Brain className="w-3 h-3 text-amber-500" />
                    <span>AI Transaction Categorization</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Target className="w-3 h-3 text-amber-500" />
                    <span>Smart Budget Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Predictive Analytics & Insights</span>
                  </div>
                </div>
                
                <Button className="w-full gradient-amber text-white shadow-colored-amber hover:scale-[1.02] transition-all duration-200 group">
                  <span>Explore Finance Portal</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>

            {/* AI Analytics Dashboard */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer"
                  onClick={() => setCurrentPortal('ai-analytics')}>
              <div className="absolute inset-0 gradient-purple opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 gap-1">
                    <Brain className="h-3 w-3" />
                    AI-Powered
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-purple-900 mb-3">AI Analytics Dashboard</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  Advanced machine learning algorithms provide predictive insights, performance analytics, and automated recommendations for educational optimization.
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Target className="w-3 h-3 text-purple-500" />
                    <span>Predictive Student Performance</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Brain className="w-3 h-3 text-purple-500" />
                    <span>Learning Pattern Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <span>Automated Insights & Alerts</span>
                  </div>
                </div>
                
                <Button className="w-full gradient-purple text-white shadow-colored-purple hover:scale-[1.02] transition-all duration-200 group">
                  <span>Explore AI Analytics</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>

            {/* Virtual Learning Hub */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer">
              <div className="absolute inset-0 gradient-cyan opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl gradient-cyan flex items-center justify-center shadow-colored-cyan group-hover:scale-110 transition-transform duration-300">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 gap-1">
                    <Video className="h-3 w-3" />
                    Live Learning
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-cyan-900 mb-3">Virtual Learning Hub</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  Integrated virtual classrooms, digital library, interactive whiteboards, and collaborative learning spaces for modern education.
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Video className="w-3 h-3 text-cyan-500" />
                    <span>HD Video Conferencing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <BookOpen className="w-3 h-3 text-cyan-500" />
                    <span>Interactive Digital Library</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Users className="w-3 h-3 text-cyan-500" />
                    <span>Collaborative Workspaces</span>
                  </div>
                </div>
                
                <Button className="w-full gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-all duration-200 group" disabled>
                  <span>Coming Soon</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Apps Section */}
        <div className="border-t border-slate-200 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">📱 Mobile Applications</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Native mobile experiences with offline capabilities, push notifications, and touch-optimized interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Mobile Teacher App */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer"
                  onClick={() => setCurrentPortal('mobile-teacher')}>
              <div className="absolute inset-0 gradient-purple opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 gap-1">
                    <Smartphone className="h-3 w-3" />
                    Mobile
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-purple-900 mb-3">Teacher Mobile App</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  Mobile-first design for teachers with offline attendance, quick grading, and real-time student communication.
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Offline Attendance & Grading</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Push Notifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Touch-Optimized Interface</span>
                  </div>
                </div>
                
                <Button className="w-full gradient-purple text-white shadow-colored-purple hover:scale-[1.02] transition-all duration-200 group">
                  <span>Open Teacher App</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Mobile Parent App */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer"
                  onClick={() => setCurrentPortal('mobile-parent')}>
              <div className="absolute inset-0 gradient-emerald opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1">
                    <Heart className="h-3 w-3" />
                    Mobile
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-emerald-900 mb-3">Parent Mobile App</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  Everything parents need in their pocket - instant updates, secure payments, and direct school communication.
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MessageCircle className="w-3 h-3 text-emerald-500" />
                    <span>Instant Teacher Messaging</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CreditCard className="w-3 h-3 text-emerald-500" />
                    <span>Secure Mobile Payments</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Camera className="w-3 h-3 text-emerald-500" />
                    <span>Photo Albums & Memories</span>
                  </div>
                </div>
                
                <Button className="w-full gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200 group">
                  <span>Open Parent App</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Schools Choose EduTrio */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-4 rounded-2xl border border-indigo-200">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-800 font-medium">Why Schools Choose EduTrio</span>
            </div>
            <div className="w-px h-6 bg-indigo-300"></div>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Brain className="h-4 w-4 text-purple-500" />
                <span>AI Analytics</span>
              </div>
              <div className="flex items-center gap-1">
                <Gamepad2 className="h-4 w-4 text-cyan-500" />
                <span>Gamification</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="h-4 w-4 text-indigo-500" />
                <span>Virtual Classes</span>
              </div>
              <div className="flex items-center gap-1">
                <Smartphone className="h-4 w-4 text-emerald-500" />
                <span>Mobile First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-3 rounded-full border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow"></div>
            <span className="text-sm text-slate-600 font-medium">
              EduTrio System Online • Academic Year 2024-25
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Powered by EduTrio • Transforming Education Through Technology
          </p>
        </div>
      </div>
    </div>
  );
}