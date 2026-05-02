import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { useAuthSync } from "@/hooks/useAuthSync";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { SkeletonDashboard } from "@/components/ui/skeleton-loader";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GuestStart from "./pages/GuestStart";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Payment from "./pages/Payment";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
const Install = lazy(() => import("./pages/Install"));
import DashboardLayout from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";

const Onboarding = lazy(() => import("./pages/Onboarding"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CVList = lazy(() => import("./pages/CVList"));
const CVBuilder = lazy(() => import("./pages/CVBuilder"));
const InterviewLanding = lazy(() => import("./pages/InterviewLanding"));
const InterviewSetup = lazy(() => import("./pages/InterviewSetup"));
const InterviewSession = lazy(() => import("./pages/InterviewSession"));
const InterviewResults = lazy(() => import("./pages/InterviewResults"));
const InterviewAI = lazy(() => import("./pages/InterviewAI"));
const Settings = lazy(() => import("./pages/Settings"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

function AuthSyncWrapper({ children }: { children: React.ReactNode }) {
  useAuthSync();
  useAuthRedirect();
  return <>{children}</>;
}

const dashboardChildren = (
  <>
    <Route index element={<Dashboard />} />
    <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    <Route path="cvs" element={<CVList />} />
    <Route path="cvs/:id" element={<CVBuilder />} />
    <Route path="interviews" element={<InterviewLanding />} />
    <Route path="interviews/setup" element={<InterviewSetup />} />
    <Route path="interviews/session" element={<InterviewSession />} />
    <Route path="interviews/results" element={<InterviewResults />} />
    <Route path="interviews/ai" element={<InterviewAI />} />
    <Route path="settings" element={<Settings />} />
  </>
);

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="moonjab-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <AuthSyncWrapper>
            <Suspense fallback={<SkeletonDashboard />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/install" element={<Suspense fallback={<SkeletonDashboard />}><Install /></Suspense>} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/guest-start" element={<GuestStart />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                  {dashboardChildren}
                </Route>

                <Route path="/test/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                  {dashboardChildren}
                </Route>

                <Route path="/usuariostest/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                  {dashboardChildren}
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthSyncWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
