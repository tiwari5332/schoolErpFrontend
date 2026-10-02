import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoutConfirmDialog } from "../../components/LogoutConfirmDialog";
import {
  useSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "../../components/ui/sidebar";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../components/ui/tooltip";
import { EduTrioLogoSimple } from "@/components/EduTrioLogo";
import useAppStore from "@/store";
import { clearAuthSession } from "@/utils/authStorage";
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
  ClipboardCheck,
  CheckSquare,
  PanelLeft,
} from "lucide-react";

const menuItems = [
  { id: 'overview', label: 'Dashboard', icon: Home, color: 'indigo', path: '/admin' },
  { id: 'attendance', label: 'Attendance', icon: CheckSquare, color: 'blue', path: '/admin/attendance' },
  { id: 'academic-setup', label: 'Academic Setup', icon: Network, color: 'fuchsia', path: '/admin/academic-setup' },
  { id: 'students', label: 'Students', icon: GraduationCap, color: 'cyan', path: '/admin/students' },
  { id: 'teachers', label: 'Staff', icon: Users, color: 'emerald', path: '/admin/teachers' },
  { id: 'schedule', label: 'Schedule & Timetable', icon: Calendar, color: 'rose', path: '/admin/schedule' },
  { id: 'communication', label: 'Communication Hub', icon: Megaphone, color: 'blue', path: '/admin/communication' },
  { id: 'fees', label: 'Fee Management', icon: Wallet, color: 'amber', path: '/admin/fees' },
  { id: 'admins', label: 'Administrators', icon: UserCheck, color: 'purple', path: '/admin/admins' },
];

const colorMap: Record<string, { text: string; gradient: string; shadow: string }> = {
  indigo: { text: 'text-indigo-500', gradient: 'gradient-indigo', shadow: 'shadow-colored-indigo' },
  fuchsia: { text: 'text-fuchsia-500', gradient: 'gradient-fuchsia', shadow: 'shadow-colored-fuchsia' },
  cyan: { text: 'text-cyan-500', gradient: 'gradient-cyan', shadow: 'shadow-colored-cyan' },
  emerald: { text: 'text-emerald-500', gradient: 'gradient-emerald', shadow: 'shadow-colored-emerald' },
  rose: { text: 'text-rose-500', gradient: 'gradient-rose', shadow: 'shadow-colored-rose' },
  blue: { text: 'text-blue-500', gradient: 'gradient-blue', shadow: 'shadow-colored-blue' },
  amber: { text: 'text-amber-500', gradient: 'gradient-amber', shadow: 'shadow-colored-amber' },
  purple: { text: 'text-purple-500', gradient: 'gradient-purple', shadow: 'shadow-colored-purple' },
};

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const clearSession = useAppStore((state) => state.clearSession);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Sidebar Context state
  const { state, toggleSidebar, isMobile } = useSidebar();
  const isCollapsed = state === 'collapsed' || (isMobile && state !== 'expanded');

  const handleLogout = () => {
    clearAuthSession();
    clearSession();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`border-r border-slate-200/80 shadow-xl flex flex-col h-full bg-white transition-all duration-300 ease-in-out shrink-0 ${isCollapsed ? 'w-16 sm:w-20' : 'w-64'
        }`}
    >
      {/* ═══ Header Section ═══ */}
      <SidebarHeader className="border-b border-slate-200/50 px-3 py-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <EduTrioLogoSimple size={isCollapsed ? 'sm' : 'lg'} className="drop-shadow-sm" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                  EduTrio
                </h2>
                <p className="text-xs text-slate-500 truncate">Admin Portal</p>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors shrink-0"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        </div>
      </SidebarHeader>

      {/* ═══ Main Menu Items ═══ */}
      <SidebarContent className={`py-4 bg-gradient-to-b from-white to-slate-50/50 ${isCollapsed ? 'px-2' : 'px-3'}`}>
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => {
            const styles = colorMap[item.color] || colorMap.indigo;
            const active = isActive(item.path);

            if (isCollapsed) {
              return (
                <SidebarMenuItem key={item.id} className="flex justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => navigate(item.path)}
                        className={`h-11 w-11 flex items-center justify-center rounded-xl transition-all duration-200 ${active
                            ? `${styles.gradient} text-white ${styles.shadow}`
                            : 'text-slate-600 hover:bg-slate-100 hover:scale-105'
                          }`}
                      >
                        <item.icon className={`h-5 w-5 ${active ? 'text-white' : styles.text}`} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-slate-900 text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-lg">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center rounded-xl px-3.5 py-3 text-left transition-all duration-300 group hover:shadow-md ${active
                      ? `${styles.gradient} text-white ${styles.shadow}`
                      : 'hover:bg-slate-100 hover:scale-[1.01]'
                    }`}
                >
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${active ? 'text-white' : styles.text
                      } group-hover:scale-110 transition-transform duration-200`}
                  />
                  <span className="ml-3 text-xs font-semibold truncate">{item.label}</span>
                  {active && <div className="ml-auto h-2 w-2 rounded-full bg-white/40 animate-pulse-slow" />}
                </button>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* ═══ Footer Section (Settings & Logout) ═══ */}
      <SidebarFooter className={`border-t border-slate-200/50 py-3 bg-gradient-to-t from-slate-50/80 to-white space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
        {/* Settings */}
        <SidebarMenuItem className={isCollapsed ? 'flex justify-center' : ''}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate('/admin/settings')}
                  className={`h-11 w-11 flex items-center justify-center rounded-xl transition-all duration-200 ${isActive('/admin/settings')
                      ? 'gradient-indigo text-white shadow-colored-indigo'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Settings className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-lg">
                Settings
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={() => navigate('/admin/settings')}
              className={`w-full flex items-center rounded-xl px-3.5 py-2.5 text-left transition-all duration-300 group ${isActive('/admin/settings')
                  ? 'gradient-indigo text-white shadow-colored-indigo'
                  : 'hover:bg-slate-100 text-slate-700'
                }`}
            >
              <Settings className={`h-5 w-5 shrink-0 ${isActive('/admin/settings') ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                } group-hover:rotate-90 transition-all duration-300`} />
              <span className="ml-3 text-xs font-semibold truncate">Settings</span>
            </button>
          )}
        </SidebarMenuItem>

        {/* Logout */}
        <SidebarMenuItem className={isCollapsed ? 'flex justify-center' : ''}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowLogoutDialog(true)}
                  className="h-11 w-11 flex items-center justify-center rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-rose-600 text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-lg">
                Logout
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="w-full flex items-center rounded-xl px-3.5 py-2.5 text-left transition-all duration-300 hover:bg-rose-50 text-rose-600 hover:text-rose-700 group"
            >
              <LogOut className="h-5 w-5 shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
              <span className="ml-3 text-xs font-semibold truncate">Logout</span>
            </button>
          )}
        </SidebarMenuItem>
      </SidebarFooter>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </aside>
  );
}

export default Sidebar;