import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from './Components/Sidebar';
import { DashboardHeader } from './Components/HeaderComponent';
import { Overview } from '@/components/Overview';
import { StudentManagement } from '@/components/StudentManagement';
import { TeacherManagement } from '@/components/TeacherManagement';
import { AdminManagement } from '@/components/AdminManagement';

const menuItems = [
  { id: 'overview', label: 'Dashboard' },
  { id: 'students', label: 'Students' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'admins', label: 'Administrators' },
];

const renderContent = (activeSection: string) => {
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

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const getActiveMenuColor = () => {
    const activeItem = menuItems.find(item => item.id === activeSection);
    return activeItem?.color || 'indigo';
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader 
            activeSection={activeSection}
            menuItems={menuItems}
            getActiveMenuColor={getActiveMenuColor}
          />
          
          <main className="flex-1 overflow-auto p-6">
            <div className="animate-float">
              {renderContent(activeSection)}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AdminDashboard;