import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  LogOut,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin', label: 'דשבורד', icon: LayoutDashboard },
  { path: '/admin/classes', label: 'שיעורים', icon: Calendar },
  { path: '/admin/clients', label: 'לקוחות', icon: Users },
  { path: '/admin/revenue', label: 'הכנסות', icon: DollarSign },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground border-l flex flex-col shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2 text-sidebar-primary font-display text-sm">
            <ArrowRight className="h-4 w-4" />
            חזרה לאתר
          </Link>
          <h2 className="font-display text-lg mt-3">פאנל ניהול</h2>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={signOut} className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
