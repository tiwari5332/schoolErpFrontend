import { Outlet, Navigate } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/HeaderComponent";
import { ToastContainer } from "../components/ui/Toast";
import { getStoredAuthToken } from "../utils/authStorage";

const menuItems = [
  { id: 'overview', label: 'Dashboard' },
  { id: 'students', label: 'Students' },
  { id: 'teachers', label: 'Staff' },
  { id: 'admins', label: 'Administrators' },
];

const getActiveMenuColor = () => {
  return 'indigo';
};

export function AdminLayout() {
  // Get active section from URL
  const path = window.location.pathname;
  const getActiveSection = () => {
    if (path.includes('students')) return 'students';
    if (path.includes('teachers')) return 'teachers';
    if (path.includes('admins')) return 'admins';
    return 'overview';
  };

  const activeSection = getActiveSection();
  console.log("AdminLayout activeSection:", activeSection);

  // Authentication check
  const authToken = getStoredAuthToken();
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar

        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            activeSection={activeSection}
            menuItems={menuItems}
            getActiveMenuColor={getActiveMenuColor}
          />

          <main className="flex-1 overflow-auto p-6">
            <div className="animate-float">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </SidebarProvider>
  );
}

export default AdminLayout;