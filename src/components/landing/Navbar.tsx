import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin, signInWithGoogle, signOut } = useAuth();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-lg text-primary">
          למי אכפת איך את רוקדת?
        </Link>
        <div className="flex items-center gap-4">
          <a href="#classes" className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:block story-link">
            <span>שיעורים</span>
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:block story-link">
            <span>עליי</span>
          </a>
          <a href="#gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:block story-link">
            <span>גלריה</span>
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:block story-link">
            <span>צרי קשר</span>
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