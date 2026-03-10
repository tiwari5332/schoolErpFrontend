import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { EduTrioLogo } from "./EduTrioLogo";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  GraduationCap, Users, BarChart3, MessageSquare, Calendar, FileText,
  TrendingUp, Shield, Zap, Clock, CheckCircle, Star, ArrowRight,
  Smartphone, Globe, Brain, Heart, BookOpen, DollarSign, Check, X,
  Sparkles, Award, Target, PieChart, Video, Bell, Camera, Wallet,
  LineChart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    {
      icon: Users,
      title: 'Student Management',
      description: 'Complete student information system with attendance tracking, grade management, and performance analytics.',
      color: 'indigo'
    },
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: 'Comprehensive test scoring, homework tracking, and curriculum management tools for better learning outcomes.',
      color: 'purple'
    },
    {
      icon: MessageSquare,
      title: 'Parent Portal',
      description: 'Real-time communication between parents and teachers with instant notifications and progress updates.',
      color: 'emerald'
    },
    {
      icon: Brain,
      title: 'AI Analytics',
      description: 'Predictive insights, performance forecasting, and intelligent recommendations powered by advanced AI.',
      color: 'cyan'
    },
    {
      icon: Wallet,
      title: 'Finance Management',
      description: 'Complete fee management, payment tracking, budget monitoring, and financial reporting system.',
      color: 'amber'
    },
    {
      icon: Calendar,
      title: 'Timetable & Events',
      description: 'Automated timetable generation, event scheduling, and calendar management for entire institution.',
      color: 'rose'
    },
    {
      icon: Video,
      title: 'Virtual Classrooms',
      description: 'Integrated video conferencing, online assignments, and digital learning resources.',
      color: 'indigo'
    },
    {
      icon: Camera,
      title: 'Photo Galleries',
      description: 'School event galleries, achievement showcases, and memory preservation system.',
      color: 'purple'
    },
    {
      icon: BarChart3,
      title: 'Advanced Reports',
      description: 'Comprehensive reporting suite with customizable dashboards and data export capabilities.',
      color: 'emerald'
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native mobile applications for iOS and Android for teachers, parents, and students.',
      color: 'cyan'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Automated alerts for attendance, grades, fees, events, and important announcements.',
      color: 'amber'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Enterprise-grade security with data encryption, role-based access, and compliance management.',
      color: 'rose'
    }
  ];

  const stats = [
    { value: '1000+', label: 'Schools', icon: GraduationCap },
    { value: '500K+', label: 'Students', icon: Users },
    { value: '50K+', label: 'Teachers', icon: Award },
    { value: '99.9%', label: 'Uptime', icon: Zap }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: { monthly: 99, yearly: 990 },
      description: 'Perfect for small schools getting started',
      color: 'indigo',
      popular: false,
      features: [
        { name: 'Up to 500 students', included: true },
        { name: 'Student management', included: true },
        { name: 'Attendance tracking', included: true },
        { name: 'Parent portal', included: true },
        { name: 'Basic reporting', included: true },
        { name: 'Email support', included: true },
        { name: 'AI analytics', included: false },
        { name: 'Finance management', included: false },
        { name: 'Mobile apps', included: false },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
        { name: 'Dedicated support', included: false }
      ]
    },
    {
      name: 'Professional',
      price: { monthly: 249, yearly: 2490 },
      description: 'Most popular for growing institutions',
      color: 'emerald',
      popular: true,
      features: [
        { name: 'Up to 2000 students', included: true },
        { name: 'Student management', included: true },
        { name: 'Attendance tracking', included: true },
        { name: 'Parent portal', included: true },
        { name: 'Advanced reporting', included: true },
        { name: 'Priority email support', included: true },
        { name: 'AI analytics', included: true },
        { name: 'Finance management', included: true },
        { name: 'Mobile apps', included: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: false },
        { name: 'Dedicated support', included: false }
      ]
    },
    {
      name: 'Enterprise',
      price: { monthly: null, yearly: null },
      description: 'Custom solutions for large institutions',
      color: 'purple',
      popular: false,
      features: [
        { name: 'Unlimited students', included: true },
        { name: 'Student management', included: true },
        { name: 'Attendance tracking', included: true },
        { name: 'Parent portal', included: true },
        { name: 'Custom reporting', included: true },
        { name: '24/7 phone & email support', included: true },
        { name: 'AI analytics & insights', included: true },
        { name: 'Finance management', included: true },
        { name: 'Mobile apps (white-label)', included: true },
        { name: 'Full custom branding', included: true },
        { name: 'Full API access', included: true },
        { name: 'Dedicated account manager', included: true }
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Principal, Greenwood Academy',
      content: 'EduTrio has transformed how we manage our school. The AI analytics help us identify at-risk students early, and parents love the real-time communication features.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'IT Director, Riverside School District',
      content: 'Implementation was smooth, and the support team is outstanding. The finance module alone has saved us countless hours of manual work.',
      rating: 5,
      image: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Teacher, Summit High School',
      content: 'As a teacher, I appreciate how intuitive the platform is. Grading, attendance, and parent communication are now effortless.',
      rating: 5,
      image: '👩‍🏫'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save 20+ Hours Weekly',
      description: 'Automate routine tasks and focus on what matters most - teaching and learning.'
    },
    {
      icon: TrendingUp,
      title: 'Improve Student Outcomes',
      description: 'Data-driven insights help identify and support struggling students early.'
    },
    {
      icon: Heart,
      title: 'Increase Parent Engagement',
      description: 'Real-time updates and easy communication strengthen school-home connections.'
    },
    {
      icon: DollarSign,
      title: 'Reduce Administrative Costs',
      description: 'Streamline operations and reduce manual paperwork by up to 70%.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <EduTrioLogo size="md" />
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Testimonials</a>
              <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
            </div>
            <Button 
              onClick={onGetStarted}
              className="gradient-indigo text-white shadow-colored-indigo"
            >
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-white/80 backdrop-blur-sm border-indigo-200 text-indigo-700 px-4 py-2">
                <Sparkles className="h-3 w-3 mr-1" />
                Transforming Education Through Technology
              </Badge>
              <div>
                <h1 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  The Complete School Management Platform
                </h1>
                <p className="text-slate-600 leading-relaxed mb-8">
                  EduTrio empowers schools with AI-powered analytics, seamless communication, 
                  comprehensive student management, and intelligent automation. Everything you need 
                  to run a modern educational institution in one powerful platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-slate-300 hover:bg-white"
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Watch Demo
                  <Video className="h-5 w-5 ml-2" />
                </Button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                    <div className="font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse-slow"></div>
              <Card className="relative border-0 shadow-2xl glass-card">
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <GraduationCap className="h-20 w-20 mx-auto mb-4 animate-float" />
                      <p className="font-medium">Interactive Demo</p>
                      <p className="text-sm opacity-90">Click "Watch Demo" to see it in action</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-indigo-100 text-indigo-700 px-4 py-2 mb-4">
              Why Choose EduTrio
            </Badge>
            <h2 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Measurable Impact on Your Institution
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Join thousands of schools that have transformed their operations with EduTrio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-indigo flex items-center justify-center shadow-colored-indigo mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Attendance Feature Highlight */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white px-4 py-2">
                <Zap className="h-3 w-3 mr-1" />
                Revolutionary Feature
              </Badge>
              <h2 className="font-bold text-white">
                Replace Manual Attendance with Digital Intelligence
              </h2>
              <p className="text-indigo-100 leading-relaxed">
                Say goodbye to paper registers and manual tracking. Our digital attendance system 
                lets teachers mark attendance in seconds, automatically notifies parents, and 
                provides real-time analytics—all from any device.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Save 15+ Minutes Daily</h4>
                    <p className="text-sm text-indigo-100">Mark entire class attendance in under 30 seconds with one-tap controls</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Instant Parent Notifications</h4>
                    <p className="text-sm text-indigo-100">Parents receive real-time SMS/email alerts when students are marked absent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Automated Analytics & Reports</h4>
                    <p className="text-sm text-indigo-100">Track patterns, identify at-risk students, and generate reports instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Works on Any Device</h4>
                    <p className="text-sm text-indigo-100">Desktop, tablet, or smartphone—mark attendance from anywhere</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl"
              >
                Try Digital Attendance
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
            <div>
              <Card className="border-0 shadow-2xl overflow-hidden glass-card">
                <CardContent className="p-2">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1766867257943-0665537fb2dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGFraW5nJTIwYXR0ZW5kYW5jZSUyMGNsYXNzcm9vbSUyMGRpZ2l0YWwlMjB0YWJsZXR8ZW58MXx8fHwxNzcyMzczNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Digital Attendance System"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">Class 10-A Attendance</span>
                          <Badge className="bg-emerald-100 text-emerald-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            95% Today
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 bg-emerald-100 rounded-lg p-2 text-center">
                            <div className="font-bold text-emerald-700">28</div>
                            <div className="text-xs text-emerald-600">Present</div>
                          </div>
                          <div className="flex-1 bg-rose-100 rounded-lg p-2 text-center">
                            <div className="font-bold text-rose-700">2</div>
                            <div className="text-xs text-rose-600">Absent</div>
                          </div>
                          <div className="flex-1 bg-amber-100 rounded-lg p-2 text-center">
                            <div className="font-bold text-amber-700">0</div>
                            <div className="text-xs text-amber-600">Late</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 px-4 py-2 mb-4">
              See It In Action
            </Badge>
            <h2 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Powerful Portals for Every User
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Experience intuitive interfaces designed specifically for administrators, teachers, students, and parents
            </p>
          </div>

          <div className="space-y-16">
            {/* Admin Dashboard Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Card className="border-0 shadow-2xl overflow-hidden glass-card hover-lift">
                  <CardContent className="p-2">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1578070581071-d9b52bf80993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZG1pbiUyMGRhc2hib2FyZCUyMGFuYWx5dGljcyUyMHNjcmVlbnxlbnwxfHx8fDE3NzIzNzI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Admin Dashboard"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <Badge className="bg-indigo-100 text-indigo-700 px-3 py-1">
                  <Users className="h-3 w-3 mr-1" />
                  Admin Portal
                </Badge>
                <h3 className="font-bold text-slate-900">
                  Comprehensive Administrative Control
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Manage your entire institution from a single, powerful dashboard. Track student performance, 
                  monitor attendance, analyze trends, and make data-driven decisions with AI-powered insights.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Real-time analytics and reporting with customizable dashboards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Complete student and staff management system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">AI-powered predictive insights and recommendations</span>
                  </li>
                </ul>
                <Button className="gradient-indigo text-white shadow-colored-indigo" onClick={onGetStarted}>
                  Explore Admin Portal
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Teacher Portal Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-700 px-3 py-1">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Teacher Portal
                </Badge>
                <h3 className="font-bold text-slate-900">
                  Streamlined Teaching Experience
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Empower educators with tools that save time and enhance learning. From smart grading to 
                  virtual classrooms, everything teachers need is at their fingertips.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">One-click attendance tracking and automated reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Intelligent grading system with performance analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Integrated virtual classroom with digital resources</span>
                  </li>
                </ul>
                <Button className="gradient-purple text-white shadow-colored-purple" onClick={onGetStarted}>
                  Explore Teacher Portal
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div>
                <Card className="border-0 shadow-2xl overflow-hidden glass-card hover-lift">
                  <CardContent className="p-2">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1758685848174-e061c6486651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwY2xhc3Nyb29tJTIwdGVjaG5vbG9neSUyMGxhcHRvcHxlbnwxfHx8fDE3NzIzNzI3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Teacher Portal"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Student Portal Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Card className="border-0 shadow-2xl overflow-hidden glass-card hover-lift">
                  <CardContent className="p-2">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1771408427146-09be9a1d4535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwb25saW5lJTIwbGVhcm5pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzcyMzQ5NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Student Portal"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <Badge className="bg-cyan-100 text-cyan-700 px-3 py-1">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  Student Portal
                </Badge>
                <h3 className="font-bold text-slate-900">
                  Engaging Learning Platform
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A gamified learning experience that motivates students. Access virtual classrooms, track progress, 
                  earn achievements, and get personalized AI recommendations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Interactive virtual classrooms with live sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Gamification with badges, points, and achievements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">AI study assistant for personalized learning paths</span>
                  </li>
                </ul>
                <Button className="gradient-cyan text-white shadow-colored-cyan" onClick={onGetStarted}>
                  Explore Student Portal
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Parent Portal Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1">
                  <Heart className="h-3 w-3 mr-1" />
                  Parent Portal
                </Badge>
                <h3 className="font-bold text-slate-900">
                  Stay Connected with Your Child's Education
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Real-time updates on your child's academic progress, attendance, and achievements. 
                  Direct communication with teachers and secure online fee payments.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Instant notifications for attendance and grades</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Direct messaging with teachers and school staff</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Photo galleries and achievement showcases</span>
                  </li>
                </ul>
                <Button className="gradient-emerald text-white shadow-colored-emerald" onClick={onGetStarted}>
                  Explore Parent Portal
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div>
                <Card className="border-0 shadow-2xl overflow-hidden glass-card hover-lift">
                  <CardContent className="p-2">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1758687126499-9ff30d1c5762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjaGlsZCUyMGhvbWV3b3JrJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzIzNzI3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Parent Portal"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Mobile & Analytics Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mobile Apps */}
              <Card className="border-0 shadow-2xl overflow-hidden glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBzbWFydHBob25lJTIwaGFuZHxlbnwxfHx8fDE3NzIyNzE4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Mobile Apps"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-1">
                        <Smartphone className="h-3 w-3 mr-1" />
                        Mobile First
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">
                    Native Mobile Applications
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Full-featured mobile apps for iOS and Android with offline capabilities, 
                    push notifications, and touch-optimized interfaces.
                  </p>
                  <Button variant="outline" className="w-full" onClick={onGetStarted}>
                    Explore Mobile Apps
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* AI Analytics */}
              <Card className="border-0 shadow-2xl overflow-hidden glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnRzJTIwZ3JhcGhzJTIwc2NyZWVufGVufDF8fHx8MTc3MjM3Mjc5NHww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="AI Analytics"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-1">
                        <Brain className="h-3 w-3 mr-1" />
                        AI-Powered
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">
                    Advanced AI Analytics
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Machine learning algorithms provide predictive insights, performance forecasting, 
                    and automated recommendations for better decision-making.
                  </p>
                  <Button variant="outline" className="w-full" onClick={onGetStarted}>
                    Explore AI Analytics
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 px-4 py-2 mb-4">
              Comprehensive Features
            </Badge>
            <h2 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              From student management to AI-powered analytics, EduTrio provides all the tools 
              modern educational institutions need to excel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg glass-card hover-lift">
                <CardContent className="p-6">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-${feature.color} flex items-center justify-center shadow-colored-${feature.color} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-100 text-emerald-700 px-4 py-2 mb-4">
              Flexible Pricing
            </Badge>
            <h2 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Choose the Perfect Plan for Your School
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Transparent pricing with no hidden fees. All plans include free onboarding and training
            </p>
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 bg-slate-100 rounded-full p-1">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedPlan === 'monthly'
                    ? 'bg-white shadow-md text-slate-900 font-medium'
                    : 'text-slate-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedPlan === 'yearly'
                    ? 'bg-white shadow-md text-slate-900 font-medium'
                    : 'text-slate-600'
                }`}
              >
                Yearly
                <Badge className="ml-2 bg-emerald-100 text-emerald-700 text-xs">Save 17%</Badge>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-lg hover-lift relative ${
                  plan.popular 
                    ? 'glass-card ring-2 ring-emerald-500 scale-105' 
                    : 'glass-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-emerald text-white shadow-colored-emerald px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className={`h-16 w-16 rounded-2xl gradient-${plan.color} flex items-center justify-center shadow-colored-${plan.color} mx-auto mb-4`}>
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="font-bold text-slate-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                  <div className="space-y-2">
                    {plan.price.monthly !== null ? (
                      <>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="font-bold text-slate-900">
                            ${selectedPlan === 'monthly' ? plan.price.monthly : plan.price.yearly}
                          </span>
                          <span className="text-sm text-slate-600">
                            /{selectedPlan === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        {selectedPlan === 'yearly' && (
                          <p className="text-xs text-emerald-600">
                            Save ${(plan.price.monthly * 12) - plan.price.yearly}/year
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="font-bold text-slate-900">Custom Pricing</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-slate-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={onGetStarted}
                    className={`w-full ${
                      plan.popular
                        ? 'gradient-emerald text-white shadow-colored-emerald'
                        : `gradient-${plan.color} text-white shadow-colored-${plan.color}`
                    }`}
                    size="lg"
                  >
                    {plan.price.monthly !== null ? 'Start Free Trial' : 'Contact Sales'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600 mb-4">
              All plans include: • Free onboarding • Data migration • Training sessions • Email support
            </p>
            <p className="text-xs text-slate-500">
              Need a custom plan? <button onClick={onGetStarted} className="text-indigo-600 hover:text-indigo-700 font-medium">Contact our sales team</button>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-100 text-cyan-700 px-4 py-2 mb-4">
              Testimonials
            </Badge>
            <h2 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Trusted by Educational Leaders
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              See what school administrators and educators are saying about EduTrio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg glass-card hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{testimonial.name}</div>
                      <div className="text-xs text-slate-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-20 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-bold mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-indigo-100 mb-8 leading-relaxed">
            Join 1000+ schools already using EduTrio. Start your free 30-day trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Demo
              <Calendar className="h-5 w-5 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-indigo-200 mt-6">
            ✓ No credit card required  ✓ Full feature access  ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <EduTrioLogo size="md" className="brightness-0 invert" />
              <p className="text-sm text-slate-400 leading-relaxed">
                Transforming education through innovative technology solutions for modern schools.
              </p>
              <div className="flex gap-3">
                <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-medium text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium text-white mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-indigo-400" />
                  <a href="mailto:contact@edutrio.com" className="hover:text-white transition-colors">
                    contact@edutrio.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-indigo-400" />
                  <a href="tel:+1234567890" className="hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-indigo-400 flex-shrink-0" />
                  <span className="hover:text-white transition-colors">
                    123 Education Street<br />
                    San Francisco, CA 94102
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2026 EduTrio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}