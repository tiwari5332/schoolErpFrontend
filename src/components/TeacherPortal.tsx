import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  FileText, 
  Calendar,
  Settings,
  Home,
  Bell,
  LogOut,
  ChevronLeft,
  Menu
} from "lucide-react";
import { EduTrioLogo } from "./EduTrioLogo";
import { TeacherOverview } from "./TeacherOverview";
import { ClassAttendance } from "./ClassAttendance";
import { TeacherAttendanceApp } from "./TeacherAttendanceApp";
import { TestManagement } from "./TestManagement";
import { LogoutConfirmDialog } from "./LogoutConfirmDialog";

interface TeacherPortalProps {}

export function TeacherPortal({}: TeacherPortalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home, gradient: 'gradient-purple' },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck, gradient: 'gradient-indigo' },
    { id: 'tests', label: 'Tests & Grades', icon: FileText, gradient: 'gradient-cyan' },
    { id: 'students', label: 'My Students', icon: Users, gradient: 'gradient-emerald' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, gradient: 'gradient-amber' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TeacherOverview />;
      case 'attendance':
        return <TeacherAttendanceApp />;
      case 'tests':
        return <TestManagement />;
      case 'students':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-4">
              My Students
            </h2>
            <p className="text-slate-600">Student management coming soon...</p>
          </div>
        );
      case 'schedule':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Class Schedule
            </h2>
            <p className="text-slate-600">Schedule management coming soon...</p>
          </div>
        );
      default:
        return <TeacherOverview />;
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
                  <h1 className="font-bold text-purple-900">EduTrio</h1>
                  <p className="text-xs text-slate-600">Teacher Portal</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-600 hover:text-purple-600 hover:bg-purple-50"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Teacher Profile */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-purple-200">
              <AvatarImage src="/placeholder-teacher.jpg" />
              <AvatarFallback className="gradient-purple text-white font-medium">
                JS
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-purple-900 truncate">John Smith</h3>
                <p className="text-sm text-slate-600 truncate">Mathematics Teacher</p>
                <Badge className="mt-1 bg-purple-100 text-purple-800 border-purple-200">
                  Class 10-A, 10-B
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
                  : 'hover:bg-white/50 text-slate-700 hover:text-purple-600'
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
            onClick={() => setShowLogoutDialog(true)}
            className={`w-full justify-start gap-3 text-red-650 hover:text-red-700 hover:bg-red-50 ${
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
      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </div>
  );
}