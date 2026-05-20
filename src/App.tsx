import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminGuard from "./components/admin/AdminGuard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClasses from "./pages/admin/AdminClasses";
import AdminClassDetail from "./pages/admin/AdminClassDetail";
import AdminClients from "./pages/admin/AdminClients";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminContent from "./pages/admin/AdminContent";
import AccessibilityWidget from "./components/a11y/AccessibilityWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route element={<AdminGuard><Outlet /></AdminGuard>}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/classes" element={<AdminClasses />} />
              <Route path="/admin/class/:id" element={<AdminClassDetail />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/revenue" element={<AdminRevenue />} />
              <Route path="/admin/content" element={<AdminContent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
