import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">טוען...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
