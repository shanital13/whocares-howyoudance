import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin, signInWithGoogle, signOut } = useAuth();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-lg text-primary">
          למי אכפת איך את רוקדת?
        </Link>
        <div className="flex items-center gap-3">
          <a href="#classes" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            שיעורים
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            עליי
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            צרי קשר
          </a>
          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin">
                    <Settings className="h-4 w-4 ml-1" />
                    ניהול
                  </Link>
                </Button>
              )}
              <span className="text-sm text-muted-foreground hidden sm:block">{user.full_name}</span>
              <Button variant="ghost" size="icon" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={signInWithGoogle} className="rounded-full">
              <LogIn className="h-4 w-4 ml-1" />
              התחברות
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
