import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Bell, 
  Calendar,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Info,
  UserPlus,
  CreditCard,
  BookOpen,
  X,
} from "lucide-react";
import { LocalStorageSync } from "../../services/LocalStorageSync";

// ─── Types ──────────────────────────────────────────────────

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'alert';
  time: string;
  read: boolean;
  icon?: string;
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
}

// ─── Mock Notifications ─────────────────────────────────────

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Student Enrolled',
    message: 'Aarav Sharma has been enrolled in Class 5A.',
    type: 'success',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    title: 'Fee Payment Due',
    message: '12 students have pending fee payments for June.',
    type: 'warning',
    time: '15 min ago',
    read: false,
  },
  {
    id: '3',
    title: 'Teacher Leave Request',
    message: 'Ms. Emily Chen has requested leave for 3 days.',
    type: 'info',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '4',
    title: 'SMS Balance Low',
    message: 'Your SMS balance is below 100. Please recharge.',
    type: 'alert',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    title: 'Exam Schedule Published',
    message: 'Mid-term exam schedule has been published successfully.',
    type: 'success',
    time: '1 day ago',
    read: true,
  },
  {
    id: '6',
    title: 'System Update',
    message: 'EduTrio v1.2 is now live with new features.',
    type: 'info',
    time: '2 days ago',
    read: true,
  },
];

const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Dashboard', path: '/admin-dashboard' },
  { id: 'students', label: 'Students', path: '/admin-dashboard/students' },
  { id: 'teachers', label: 'Teachers', path: '/admin-dashboard/teachers' },
  { id: 'admins', label: 'Administrators', path: '/admin-dashboard/admins' },
  { id: 'settings', label: 'Settings & Billing', path: '/admin-dashboard/settings' },
  { id: 'profile', label: 'Profile', path: '/admin-dashboard/profile' },
];

const getActiveMenuColor = () => 'indigo';

// ─── Notification Icon Helper ───────────────────────────────

function NotificationIcon({ type }: { type: Notification['type'] }) {
  const config = {
    success: { icon: CheckCircle2, bg: 'bg-emerald-100', color: 'text-emerald-600' },
    warning: { icon: AlertTriangle, bg: 'bg-amber-100', color: 'text-amber-600' },
    info: { icon: Info, bg: 'bg-blue-100', color: 'text-blue-600' },
    alert: { icon: AlertTriangle, bg: 'bg-rose-100', color: 'text-rose-600' },
  };
  const { icon: Icon, bg, color } = config[type];

  return (
    <div className={`h-9 w-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
      <Icon className={`h-4 w-4 ${color}`} />
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────

export function DashboardHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [academicYear, setAcademicYear] = useState('2024-25');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const activeItem = menuItems.find(item => item.path === location.pathname) || menuItems[0];

  // Load profile name
  const [profileName, setProfileName] = useState('John Anderson');
  useEffect(() => {
    const saved = LocalStorageSync.get<{ name: string }>('edu_trio_admin_profile');
    if (saved?.name) setProfileName(saved.name);
  }, [location.pathname]); // re-read when navigating back from profile

  // Load notifications
  useEffect(() => {
    const saved = LocalStorageSync.get<Notification[]>('edu_trio_notifications');
    if (saved) {
      setNotifications(saved);
    } else {
      setNotifications(DEFAULT_NOTIFICATIONS);
      LocalStorageSync.set('edu_trio_notifications', DEFAULT_NOTIFICATIONS);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    LocalStorageSync.set('edu_trio_notifications', updated);
  };

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    LocalStorageSync.set('edu_trio_notifications', updated);
  };

  const removeNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    LocalStorageSync.set('edu_trio_notifications', updated);
  };

  const initials = profileName.split(' ').map(n => n[0]).join('').toUpperCase();

  const currentYear = new Date().getFullYear();
  const baseYear = currentYear >= 2024 ? currentYear : 2024;
  const academicYears = Array.from({ length: 10 }, (_, i) => {
    const startYear = baseYear - i;
    return `${startYear}-${(startYear + 1).toString().slice(-2)}`;
  });

  return (
    <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-lg px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div>
            <h1 className={`text-2xl font-semibold bg-gradient-to-r from-${getActiveMenuColor()}-600 to-${getActiveMenuColor()}-500 bg-clip-text text-transparent`}>
              {activeItem.label}
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

          {/* Academic Year Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors h-auto font-normal">
                <Calendar className="h-3 w-3" />
                Academic Year {academicYear}
                <ChevronDown className="h-3 w-3 opacity-50 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {academicYears.map(year => (
                <DropdownMenuItem 
                  key={year} 
                  onClick={() => setAcademicYear(year)}
                  className={year === academicYear ? "bg-emerald-50 text-emerald-700 font-medium" : ""}
                >
                  Academic Year {year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* ═══ Notification Bell ═══ */}
          <DropdownMenu open={isNotifOpen} onOpenChange={setIsNotifOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative rounded-full hover:bg-slate-100 transition-all duration-200">
                <Bell className="h-4 w-4 text-slate-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4.5 w-4.5 min-w-[18px] bg-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-pulse-slow px-1">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[380px] p-0 rounded-2xl shadow-2xl border-0 overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-bold text-slate-800">Notifications</span>
                    {unreadCount > 0 && (
                      <Badge className="bg-rose-500 text-white border-0 text-[10px] px-1.5 py-0 h-4">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); markAllRead(); }}
                      className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-7 px-2"
                    >
                      Mark all read
                    </Button>
                  )}
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-[360px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center">
                    <Bell className="h-10 w-10 text-slate-200 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-400">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50/70 transition-colors relative group ${
                        !notif.read ? 'bg-indigo-50/30' : ''
                      }`}
                    >
                      <NotificationIcon type={notif.type} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold truncate ${!notif.read ? 'text-slate-900' : 'text-slate-600'}`}>
                            {notif.title}
                          </p>
                          {!notif.read && (
                            <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-rose-500 hover:bg-rose-50 shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 w-full h-7"
                    onClick={() => { setIsNotifOpen(false); }}
                  >
                    View All Notifications
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* ═══ Profile / Name Avatar ═══ */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200 hover:opacity-80 transition-opacity">
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-700">{profileName}</div>
                  <div className="text-xs text-slate-500">Super Admin</div>
                </div>
                <Avatar className="h-10 w-10 ring-2 ring-indigo-100 hover:ring-indigo-300 transition-all duration-200">
                  <AvatarFallback className="gradient-indigo text-white text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px] rounded-xl shadow-2xl border-0 p-1.5">
              <DropdownMenuLabel className="px-3 py-2">
                <p className="text-sm font-semibold text-slate-800">{profileName}</p>
                <p className="text-xs text-slate-500 font-normal">Super Admin</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate('/admin-dashboard/profile')}
                className="gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <User className="h-4 w-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate('/admin-dashboard/settings')}
                className="gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Settings className="h-4 w-4" />
                Settings & Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem('auth_token');
                  navigate('/login');
                }}
                className="gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;