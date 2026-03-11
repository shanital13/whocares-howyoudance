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
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin', label: 'דשבורד', icon: LayoutDashboard },
  { path: '/admin/classes', label: 'שיעורים', icon: Calendar },
  { path: '/admin/clients', label: 'לקוחות', icon: Users },
  { path: '/admin/revenue', label: 'הכנסות', icon: DollarSign },
  { path: '/admin/content', label: 'עריכת תוכן', icon: FileText },
];

const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-body text-sm hover:text-primary/80 transition-colors"
          onClick={onNavigate}
        >
          <ArrowRight className="h-4 w-4" />
          חזרה לאתר
        </Link>
        <h2 className="font-nehama text-xl mt-3 text-sidebar-foreground">פאנל ניהול</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 relative',
                isActive
                  ? 'bg-primary/8 text-primary font-semibold'
                  : 'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-primary" />
              )}
              <item.icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.2 : 1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-sidebar-foreground/50 truncate font-body">{user?.email}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
          >
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[hsl(0,0%,97%)]">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-5 py-3.5 border-b border-sidebar-border bg-sidebar">
        <h2 className="font-nehama text-lg text-sidebar-foreground">פאנל ניהול</h2>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border">
            <div className="flex flex-col h-full">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 bg-sidebar border-l border-sidebar-border flex-col shrink-0 shadow-[2px_0_12px_rgba(0,0,0,0.03)]">
        <SidebarNav />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-5 md:p-8 max-w-6xl">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
