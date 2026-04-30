import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Bell, 
  Calendar,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Dashboard', path: '/admin-dashboard' },
  { id: 'students', label: 'Students', path: '/admin-dashboard/students' },
  { id: 'teachers', label: 'Teachers', path: '/admin-dashboard/teachers' },
  { id: 'admins', label: 'Administrators', path: '/admin-dashboard/admins' },
];

const getActiveMenuColor = () => 'indigo';

export function DashboardHeader() {
  const location = useLocation();

  const activeItem = menuItems.find(item => item.path === location.pathname) || menuItems[0];

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
              <AvatarFallback className="gradient-indigo text-white text-sm font-medium">
                JA
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;