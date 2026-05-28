import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  BarChart3, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  Search,
  Home,
  Sparkles
} from "lucide-react";
import { Overview } from "./Overview";
import { LogoutConfirmDialog } from "./LogoutConfirmDialog";
import { StudentManagement } from "../features/student-management";
import { TeacherManagement } from "./TeacherManagement";
import { AdminManagement } from "./AdminManagement";
import { EduTrioLogoSimple } from "./EduTrioLogo";

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: Home, color: 'indigo' },
    { id: 'students', label: 'Students', icon: GraduationCap, color: 'cyan' },
    { id: 'teachers', label: 'Teachers', icon: Users, color: 'emerald' },
    { id: 'admins', label: 'Administrators', icon: UserCheck, color: 'purple' },
  ];

  const getActiveMenuColor = () => {
    const activeItem = menuItems.find(item => item.id === activeSection);
    return activeItem?.color || 'indigo';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'admins':
        return <AdminManagement />;
      default:
        return <Overview />;
    }
  };

  return (
    <>
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r-0 shadow-xl">
          <SidebarHeader className="border-b border-slate-200/50 px-6 py-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <EduTrioLogoSimple size="lg" className="drop-shadow-sm" />
              </div>
              <div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  EduTrio
                </h2>
                <p className="text-sm text-slate-600">Admin Portal</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 py-6 bg-gradient-to-b from-white to-slate-50/50">
            <SidebarMenu className="space-y-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className={`w-full rounded-xl px-4 py-3.5 text-left transition-all duration-300 group hover:shadow-lg ${
                      activeSection === item.id
                        ? `gradient-${item.color} text-white shadow-colored-${item.color}`
                        : 'hover:bg-slate-50 hover:scale-[1.02]'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${
                      activeSection === item.id ? 'text-white' : `text-${item.color}-500`
                    } group-hover:scale-110 transition-transform duration-200`} />
                    <span className="ml-3 font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-white/30 animate-pulse-slow" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <div className="mt-auto pt-8 space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full rounded-xl px-4 py-3 text-left transition-all duration-300 hover:bg-slate-100 hover:scale-[1.02] group">
                  <Settings className="h-5 w-5 text-slate-500 group-hover:text-slate-700 group-hover:rotate-90 transition-all duration-300" />
                  <span className="ml-3 font-medium text-slate-700">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setShowLogoutDialog(true)}
                  className="w-full rounded-xl px-4 py-3 text-left transition-all duration-300 hover:bg-rose-50 hover:scale-[1.02] text-rose-600 hover:text-rose-700 group"
                >
                  <LogOut className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  <span className="ml-3 font-medium">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-lg px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className={`text-2xl font-semibold bg-gradient-to-r from-${getActiveMenuColor()}-600 to-${getActiveMenuColor()}-500 bg-clip-text text-transparent`}>
                    {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Welcome back, manage your institution efficiently with EduTrio
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="relative rounded-full hover:bg-slate-100 transition-all duration-200">
                  <Search className="h-4 w-4 text-slate-500" />
                </Button>
                <Badge variant="outline" className="gap-2 bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors">
                  <Calendar className="h-3 w-3" />
                  Academic Year 2024-25
                </Badge>
                <Button variant="ghost" size="sm" className="relative rounded-full hover:bg-slate-100 transition-all duration-200">
                  <Bell className="h-4 w-4 text-slate-500" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-rose-500 rounded-full animate-pulse-slow"></span>
                </Button>
                <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-700">John Anderson</div>
                    <div className="text-xs text-slate-500">Super Admin</div>
                  </div>
                  <Avatar className="h-10 w-10 ring-2 ring-indigo-100 hover:ring-indigo-200 transition-all duration-200">
                    <AvatarImage src="" />
                    <AvatarFallback className="gradient-indigo text-white text-sm font-medium">
                      JA
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            <div className="animate-float">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>

    <LogoutConfirmDialog
      open={showLogoutDialog}
      onOpenChange={setShowLogoutDialog}
      onConfirm={handleLogout}
    />
    </>
  );
}