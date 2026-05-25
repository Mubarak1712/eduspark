import { useState, type ReactNode } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <TopBar sidebarCollapsed={collapsed} />
      <main
        className="pt-16 min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? 72 : 260 }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
