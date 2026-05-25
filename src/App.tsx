import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { TeacherDashboard } from './pages/dashboards/TeacherDashboard';
import { ParentDashboard } from './pages/dashboards/ParentDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { QuizPage } from './pages/QuizPage';
import { RewardsPage } from './pages/RewardsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { AttendancePage } from './pages/AttendancePage';
import { HomeworkPage } from './pages/HomeworkPage';
import { TimetablePage } from './pages/TimetablePage';
import { NoticesPage } from './pages/NoticesPage';

function DashboardRouter() {
  const { user } = useAuth();
  if (user?.role === 'teacher') return <TeacherDashboard />;
  if (user?.role === 'parent') return <ParentDashboard />;
  if (user?.role === 'admin') return <AdminDashboard />;
  return <StudentDashboard />;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
      <Route path="/homework" element={<ProtectedRoute><HomeworkPage /></ProtectedRoute>} />
      <Route path="/timetable" element={<ProtectedRoute><TimetablePage /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/activities" element={<ProtectedRoute><ActivitiesPage /></ProtectedRoute>} />
      <Route path="/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
      <Route path="/notices" element={<ProtectedRoute><NoticesPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
