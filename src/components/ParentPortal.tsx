import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
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
  MessageCircle,
  Camera,
  CreditCard,
  Trophy,
  BookOpen,
  Send,
  Phone,
  Mail,
  Video,
  Download,
  Heart,
  Star,
  Award,
  School,
  MapPin,
  Clock
} from "lucide-react";
import { EduTrioLogo } from "./EduTrioLogo";
import { ParentOverview } from "./ParentOverview";

interface ParentPortalProps {}

export function ParentPortal({}: ParentPortalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messageText, setMessageText] = useState('');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home, gradient: 'gradient-emerald' },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck, gradient: 'gradient-indigo' },
    { id: 'tests', label: 'Test Results', icon: FileText, gradient: 'gradient-cyan' },
    { id: 'chat', label: 'Teacher Chat', icon: MessageCircle, gradient: 'gradient-purple' },
    { id: 'homework', label: 'Homework', icon: BookOpen, gradient: 'gradient-amber' },
    { id: 'photos', label: 'Photo Gallery', icon: Camera, gradient: 'gradient-rose' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, gradient: 'gradient-amber' },
    { id: 'fees', label: 'Fee Payment', icon: CreditCard, gradient: 'gradient-cyan' },
    { id: 'events', label: 'School Events', icon: Calendar, gradient: 'gradient-indigo' },
  ];

  const teacherChats = [
    {
      id: '1',
      teacher: 'Ms. Sarah Wilson',
      subject: 'Mathematics',
      lastMessage: 'Emma did excellent work on her algebra test! She shows great understanding of quadratic equations.',
      time: '2 hours ago',
      unread: 2,
      avatar: '/teacher1.jpg',
      status: 'online'
    },
    {
      id: '2', 
      teacher: 'Mr. John Davis',
      subject: 'Physics',
      lastMessage: 'Please ensure Emma brings her lab notebook tomorrow. We will be conducting the motion experiment.',
      time: '1 day ago',
      unread: 0,
      avatar: '/teacher2.jpg',
      status: 'offline'
    },
    {
      id: '3',
      teacher: 'Mrs. Lisa Brown',
      subject: 'Chemistry',
      lastMessage: 'Emma needs to improve her lab report writing skills. I can provide additional guidance after class.',
      time: '2 days ago',
      unread: 1,
      avatar: '/teacher3.jpg',
      status: 'away'
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
      description: 'Complete exercises 1-15 from page 87. Focus on factoring and solving quadratic equations using different methods.',
      assignedDate: '2024-08-25',
      estimatedTime: '2 hours'
    },
    {
      id: '2',
      subject: 'Physics', 
      title: 'Lab Report - Motion Experiment',
      dueDate: '2024-08-30',
      status: 'submitted',
      priority: 'medium',
      description: 'Write a detailed report on the motion experiment conducted in class. Include observations, calculations, and conclusions.',
      assignedDate: '2024-08-23',
      estimatedTime: '3 hours'
    },
    {
      id: '3',
      subject: 'English',
      title: 'Essay - Environmental Conservation',
      dueDate: '2024-09-02',
      status: 'in-progress',
      priority: 'low',
      description: '500-word essay on environmental conservation methods. Include at least 3 reliable sources and proper citations.',
      assignedDate: '2024-08-20',
      estimatedTime: '2.5 hours'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Mathematics Excellence Award',
      description: 'Achieved highest score in Mathematics Mid-term examination with 95% marks',
      date: '2024-08-25',
      category: 'Academic',
      icon: '🏆',
      color: 'gradient-amber',
      level: 'Gold'
    },
    {
      id: '2',
      title: 'Perfect Attendance Champion',
      description: 'Maintained 100% attendance record for the entire academic quarter',
      date: '2024-08-01',
      category: 'Attendance',
      icon: '⭐',
      color: 'gradient-emerald',
      level: 'Platinum'
    },
    {
      id: '3',
      title: 'Science Project Winner',
      description: 'First place in inter-class science project competition for innovative solar energy model',
      date: '2024-07-28',
      category: 'Competition',
      icon: '🔬',
      color: 'gradient-indigo',
      level: 'Gold'
    },
    {
      id: '4',
      title: 'Leadership Excellence',
      description: 'Successfully led the environmental awareness campaign in school',
      date: '2024-07-15',
      category: 'Leadership',
      icon: '👑',
      color: 'gradient-purple',
      level: 'Silver'
    }
  ];

  const feeDetails = {
    totalFees: 15000,
    paidAmount: 10000,
    pendingAmount: 5000,
    nextDueDate: '2024-09-15',
    paymentPlan: 'Quarterly',
    transactions: [
      { id: '1', date: '2024-08-01', amount: 5000, description: 'Tuition Fee - August 2024', status: 'paid', method: 'Online' },
      { id: '2', date: '2024-07-01', amount: 5000, description: 'Tuition Fee - July 2024', status: 'paid', method: 'Bank Transfer' },
      { id: '3', date: '2024-06-01', amount: 5000, description: 'Annual Development Fee', status: 'paid', method: 'Cheque' }
    ]
  };

  const photoGallery = [
    {
      id: '1',
      title: 'Science Fair 2024',
      date: '2024-08-25',
      photos: 12,
      thumbnail: '/science-fair.jpg',
      category: 'Academic Events',
      description: 'Annual science fair showcasing innovative student projects'
    },
    {
      id: '2',
      title: 'Sports Day Championship',
      date: '2024-08-20',
      photos: 25,
      thumbnail: '/sports-day.jpg',
      category: 'Sports',
      description: 'Inter-house sports competition with various athletic events'
    },
    {
      id: '3',
      title: 'Art & Craft Exhibition',
      date: '2024-08-15',
      photos: 18,
      thumbnail: '/art-exhibition.jpg',
      category: 'Arts',
      description: 'Student artwork and craft displays from different grade levels'
    },
    {
      id: '4',
      title: 'Cultural Festival',
      date: '2024-08-10',
      photos: 30,
      thumbnail: '/cultural-fest.jpg',
      category: 'Cultural',
      description: 'Annual cultural celebration with music, dance, and drama performances'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ParentOverview />;
      case 'chat':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Teacher Communication
              </h2>
              <Button className="gradient-purple text-white shadow-colored-purple">
                <Video className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chat List */}
              <Card className="glass-card border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <MessageCircle className="h-5 w-5" />
                    Active Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teacherChats.map((chat) => (
                    <div key={chat.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white">
                          <AvatarFallback className="gradient-purple text-white font-medium">
                            {chat.teacher.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          chat.status === 'online' ? 'bg-emerald-500' :
                          chat.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900">{chat.teacher}</p>
                          <span className="text-xs text-slate-500">{chat.time}</span>
                        </div>
                        <p className="text-sm text-purple-600 mb-1">{chat.subject}</p>
                        <p className="text-sm text-slate-600 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <Badge className="bg-purple-500 text-white">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Message */}
              <Card className="glass-card border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-purple-900">Send Quick Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Select Teacher</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Choose a teacher...</option>
                      <option>Ms. Sarah Wilson - Mathematics</option>
                      <option>Mr. John Davis - Physics</option>
                      <option>Mrs. Lisa Brown - Chemistry</option>
                      <option>Ms. Emily Clark - English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea
                      placeholder="Type your message here..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 gradient-purple text-white shadow-colored-purple">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="hover:bg-purple-50">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'homework':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Homework & Assignments
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {homeworkItems.map((item) => (
                  <Card key={item.id} className="glass-card border-0 shadow-lg hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          item.status === 'submitted' ? 'gradient-emerald' :
                          item.status === 'in-progress' ? 'gradient-amber' :
                          item.priority === 'high' ? 'gradient-rose' : 'gradient-indigo'
                        }`}>
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                            <Badge className={
                              item.status === 'submitted' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                              item.status === 'in-progress' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                              'bg-red-100 text-red-800 border-red-200'
                            }>
                              {item.status === 'submitted' ? 'Submitted' : 
                               item.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </Badge>
                          </div>
                          <p className="text-purple-600 font-medium mb-2">{item.subject}</p>
                          <p className="text-slate-700 mb-4">{item.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">Assigned:</span>
                              <p className="font-medium">{item.assignedDate}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Due Date:</span>
                              <p className="font-medium">{item.dueDate}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Est. Time:</span>
                              <p className="font-medium">{item.estimatedTime}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Priority:</span>
                              <Badge className={
                                item.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                                item.priority === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                'bg-blue-100 text-blue-800 border-blue-200'
                              }>
                                {item.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Homework Summary */}
              <Card className="glass-card border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-amber-900">This Week Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-amber-50">
                    <div className="text-3xl font-bold text-amber-900">3</div>
                    <div className="text-sm text-amber-700">Total Assignments</div>
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
                  <Button className="w-full gradient-amber text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download Schedule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'photos':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                School Photo Gallery
              </h2>
              <Button className="gradient-rose text-white shadow-colored-rose">
                <Heart className="h-4 w-4 mr-2" />
                Create Album
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoGallery.map((album) => (
                <Card key={album.id} className="glass-card border-0 shadow-lg hover-lift group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="h-48 gradient-rose rounded-t-xl flex items-center justify-center relative overflow-hidden">
                      <Camera className="h-16 w-16 text-white opacity-50" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-rose-800 border-rose-200">
                          {album.photos} photos
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{album.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{album.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">📅 {album.date}</p>
                          <Badge className="bg-rose-100 text-rose-800 border-rose-200 mt-1">
                            {album.category}
                          </Badge>
                        </div>
                        <Button size="sm" className="gradient-rose text-white">
                          View Gallery
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                Achievements & Awards
              </h2>
              <Button className="gradient-amber text-white shadow-colored-amber">
                <Star className="h-4 w-4 mr-2" />
                View Certificate
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="glass-card border-0 shadow-lg hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-16 w-16 rounded-2xl ${achievement.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{achievement.title}</h3>
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            {achievement.level}
                          </Badge>
                        </div>
                        <p className="text-slate-700 mb-3">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-500">📅 {achievement.date}</p>
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200 mt-1">
                              {achievement.category}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="hover:bg-amber-50">
                              <Download className="h-3 w-3 mr-1" />
                              Certificate
                            </Button>
                            <Button size="sm" className="gradient-amber text-white">
                              <Heart className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'fees':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Fee Management & Payments
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Fee Overview */}
              <Card className="glass-card border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-cyan-900">Fee Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-cyan-50">
                    <div className="text-2xl font-bold text-cyan-900">₹{feeDetails.totalFees}</div>
                    <div className="text-sm text-cyan-700">Total Annual Fees</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Paid Amount</span>
                      <span className="font-bold text-emerald-600">₹{feeDetails.paidAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pending Amount</span>
                      <span className="font-bold text-red-600">₹{feeDetails.pendingAmount}</span>
                    </div>
                    <Progress value={(feeDetails.paidAmount / feeDetails.totalFees) * 100} className="h-2" />
                    <div className="text-center pt-2">
                      <p className="text-sm text-slate-600">Next due: {feeDetails.nextDueDate}</p>
                      <p className="text-xs text-slate-500">Payment Plan: {feeDetails.paymentPlan}</p>
                    </div>
                  </div>
                  <Button className="w-full gradient-cyan text-white shadow-colored-cyan">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now - ₹{feeDetails.pendingAmount}
                  </Button>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <div className="lg:col-span-2">
                <Card className="glass-card border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-slate-600">Description</th>
                            <th className="text-left py-3 px-4 font-medium text-slate-600">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-slate-600">Method</th>
                            <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-slate-600">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeDetails.transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-slate-100 hover:bg-white/30 transition-colors">
                              <td className="py-3 px-4 text-slate-600">{transaction.date}</td>
                              <td className="py-3 px-4">
                                <p className="font-medium text-slate-900">{transaction.description}</p>
                              </td>
                              <td className="py-3 px-4 font-bold text-slate-900">₹{transaction.amount}</td>
                              <td className="py-3 px-4 text-slate-600">{transaction.method}</td>
                              <td className="py-3 px-4">
                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                                  {transaction.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Button size="sm" variant="outline" className="hover:bg-cyan-50">
                                  <Download className="h-3 w-3 mr-1" />
                                  Receipt
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              School Events & Calendar
            </h2>
            <p className="text-slate-600">Stay updated with upcoming school events, meetings, and important dates.</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Attendance Records
            </h2>
            <p className="text-slate-600">Detailed attendance tracking coming soon...</p>
          </div>
        );
      case 'tests':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Test Results & Progress
            </h2>
            <p className="text-slate-600">Test results and academic progress tracking coming soon...</p>
          </div>
        );
      default:
        return <ParentOverview />;
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
                  <h1 className="font-bold text-emerald-900">EduTrio</h1>
                  <p className="text-xs text-slate-600">Parent Portal</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Student Profile */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-emerald-200">
              <AvatarImage src="/placeholder-student.jpg" />
              <AvatarFallback className="gradient-emerald text-white font-medium">
                EJ
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-emerald-900 truncate">Emma Johnson</h3>
                <p className="text-sm text-slate-600 truncate">Class 10-A • Roll No: 005</p>
                <Badge className="mt-1 bg-emerald-100 text-emerald-800 border-emerald-200">
                  Active Student
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
                  : 'hover:bg-white/50 text-slate-700 hover:text-emerald-600'
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