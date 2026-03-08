import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  LogOut,
  ArrowRight,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin', label: 'דשבורד', icon: LayoutDashboard },
  { path: '/admin/classes', label: 'שיעורים', icon: Calendar },
  { path: '/admin/clients', label: 'לקוחות', icon: Users },
  { path: '/admin/revenue', label: 'הכנסות', icon: DollarSign },
];

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sidebar-primary font-display text-sm"
          onClick={onNavigate}
        >
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
              onClick={onNavigate}
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
    </>
  );
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b bg-sidebar text-sidebar-foreground">
        <h2 className="font-display text-lg">פאנל ניהול</h2>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-0 bg-sidebar text-sidebar-foreground">
            <div className="flex flex-col h-full">
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-sidebar text-sidebar-foreground border-l flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
