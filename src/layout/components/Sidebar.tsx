import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoutConfirmDialog } from "../../components/LogoutConfirmDialog";
import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../../components/ui/sidebar";
import { EduTrioLogoSimple } from "@/components/EduTrioLogo";
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  Home,
  Settings, 
  LogOut,
  Wallet,
  Calendar,
  Megaphone,
  Network,
  ClipboardCheck
} from "lucide-react";

const menuItems = [
  { id: 'overview', label: 'Dashboard', icon: Home, color: 'indigo', path: '/admin-dashboard' },
  { id: 'academic-setup', label: 'Academic Setup', icon: Network, color: 'fuchsia', path: '/admin-dashboard/academic-setup' },
  { id: 'students', label: 'Students', icon: GraduationCap, color: 'cyan', path: '/admin-dashboard/students' },
  { id: 'teachers', label: 'Teachers', icon: Users, color: 'emerald', path: '/admin-dashboard/teachers' },
  { id: 'schedule', label: 'Schedule & Timetable', icon: Calendar, color: 'rose', path: '/admin-dashboard/schedule' },
  { id: 'exams', label: 'Exam Management', icon: ClipboardCheck, color: 'indigo', path: '/admin-dashboard/exams' },
  { id: 'communication', label: 'Communication Hub', icon: Megaphone, color: 'blue', path: '/admin-dashboard/communication' },
  { id: 'fees', label: 'Fee Management', icon: Wallet, color: 'amber', path: '/admin-dashboard/fees' },
  { id: 'admins', label: 'Administrators', icon: UserCheck, color: 'purple', path: '/admin-dashboard/admins' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
console.log("Sidebar active path:", location.pathname);
  return (
    <div className="border-r-0 shadow-xl">
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
                onClick={() => navigate(item.path)}
                isActive={() => isActive(item.path)}
                className={`w-full rounded-xl px-4 py-3.5 text-left transition-all duration-300 group hover:shadow-lg ${
                  isActive(item.path)
                    ? `gradient-${item.color} text-white shadow-colored-${item.color}`
                    : 'hover:bg-slate-50 hover:scale-[1.02]'
                }`}
              >
                <item.icon className={`h-5 w-5 ${
                  isActive(item.path) ? 'text-white' : `text-${item.color}-500`
                } group-hover:scale-110 transition-transform duration-200`} />
                <span className="ml-3 font-medium">{item.label}</span>
                {isActive(item.path) && (
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

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default Sidebar;