import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { Navbar } from './components/common/Navbar.js';
import { Sidebar } from './components/common/Sidebar.js';
import { GlobalSearchModal } from './components/common/GlobalSearchModal.js';
import { NotificationDrawer } from './components/common/NotificationDrawer.js';
import { HelpDeskModal } from './components/common/HelpDeskModal.js';
import { ErrorBoundary } from './components/common/ErrorBoundary.js';

// Public pages
import { Home } from './pages/Home.js';
import { Login } from './pages/Login.js';

// Student pages
import { StudentDashboard } from './pages/student/StudentDashboard.js';
import { CareerExplorer } from './pages/student/CareerExplorer.js';
import { SkillAssessment } from './pages/student/SkillAssessment.js';
import { SkillGapAnalysis } from './pages/student/SkillGapAnalysis.js';
import { LearningHub } from './pages/student/LearningHub.js';
import { CaseBasedLearning } from './pages/student/CaseBasedLearning.js';
import { Internships } from './pages/student/Internships.js';
import { MentorshipHub } from './pages/student/MentorshipHub.js';
import { ResearchOpportunities } from './pages/student/ResearchOpportunities.js';
import { LiveProjects } from './pages/student/LiveProjects.js';
import { InnovationChallenges } from './pages/student/InnovationChallenges.js';
import { SkillPassport } from './pages/student/SkillPassport.js';
import { DocumentsManagement } from './pages/student/DocumentsManagement.js';
import { StudentAnalytics } from './pages/student/StudentAnalytics.js';
import { Profile } from './pages/Profile.js';

// Faculty, Mentor, Recruiter pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard.js';
import { MentorDashboard } from './pages/mentor/MentorDashboard.js';
import { RecruiterDashboard } from './pages/recruiter/RecruiterDashboard.js';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const location = useLocation();

  const isPublicPage = location.pathname === '/' || location.pathname === '/login';

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Global Navbar */}
      <div className="no-print">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenHelp={() => setHelpOpen(true)}
        />
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar (Rendered for portal views) */}
        {!isPublicPage && (
          <div className="no-print">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-200 ${
            isPublicPage
              ? 'p-0'
              : `p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full ${sidebarOpen && !isPublicPage ? 'lg:ml-64' : 'lg:ml-0'}`
          }`}
        >
          {children}
        </main>
      </div>

      {/* Global Interactive Modals and Drawers */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationDrawer isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <HelpDeskModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout>
            <ErrorBoundary>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Student Portal Routes */}
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/careers" element={<CareerExplorer />} />
                <Route path="/student/assessment" element={<SkillAssessment />} />
                <Route path="/student/skill-gaps" element={<SkillGapAnalysis />} />
                <Route path="/student/learning" element={<LearningHub />} />
                <Route path="/student/cases" element={<CaseBasedLearning />} />
                <Route path="/student/internships" element={<Internships />} />
                <Route path="/student/mentorship" element={<MentorshipHub />} />
                <Route path="/student/research" element={<ResearchOpportunities />} />
                <Route path="/student/projects" element={<LiveProjects />} />
                <Route path="/student/challenges" element={<InnovationChallenges />} />
                <Route path="/student/passport" element={<SkillPassport />} />
                <Route path="/student/skill-passport" element={<SkillPassport />} />
                <Route path="/student/documents" element={<DocumentsManagement />} />
                <Route path="/student/analytics" element={<StudentAnalytics />} />
                <Route path="/profile" element={<Profile />} />

                {/* Faculty Portal Routes */}
                <Route path="/faculty" element={<FacultyDashboard />} />
                <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
                <Route path="/faculty/analytics" element={<FacultyDashboard />} />
                <Route path="/faculty/industry-demand" element={<FacultyDashboard />} />
                <Route path="/faculty/curriculum-insights" element={<FacultyDashboard />} />
                <Route path="/faculty/collaboration" element={<FacultyDashboard />} />
                <Route path="/faculty/opportunities" element={<FacultyDashboard />} />

                {/* Mentor Portal Routes */}
                <Route path="/mentor" element={<MentorDashboard />} />
                <Route path="/mentor/dashboard" element={<MentorDashboard />} />
                <Route path="/mentor/mentees" element={<MentorDashboard />} />
                <Route path="/mentor/sessions" element={<MentorDashboard />} />
                <Route path="/mentor/goals" element={<MentorDashboard />} />
                <Route path="/mentor/feedback" element={<MentorDashboard />} />

                {/* Recruiter Portal Routes */}
                <Route path="/recruiter" element={<RecruiterDashboard />} />
                <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                <Route path="/recruiter/post-opportunity" element={<RecruiterDashboard />} />
                <Route path="/recruiter/applications" element={<RecruiterDashboard />} />
                <Route path="/recruiter/candidates" element={<RecruiterDashboard />} />
                <Route path="/recruiter/collaboration" element={<RecruiterDashboard />} />
                <Route path="/recruiter/analytics" element={<RecruiterDashboard />} />

                {/* Fallback to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
