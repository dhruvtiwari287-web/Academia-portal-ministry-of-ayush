import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  HelpCircle,
  Menu,
  X,
  LogOut,
  UserCheck,
  ChevronDown,
  GraduationCap,
  Briefcase,
  Users,
  Building2,
  BookOpenCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { useTheme } from '../../context/ThemeContext.js';
import { MedicalDisclaimerBadge } from './MedicalDisclaimerBadge.js';
import { GlobalSearchModal } from './GlobalSearchModal.js';
import { NotificationDrawer } from './NotificationDrawer.js';
import { HelpDeskModal } from './HelpDeskModal.js';
import { api } from '../../services/api.js';

interface NavbarProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onOpenHelp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  sidebarOpen,
  onOpenSearch,
  onOpenNotifications,
  onOpenHelp
}) => {
  const { user, logout, demoLogin } = useAuth();
  const { actualTheme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitchOpen, setRoleSwitchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      api.getNotifications()
        .then(res => {
          if (res.success) setUnreadCount(res.unreadCount);
        })
        .catch(() => {});
    }
  }, [user]);

  const handleRoleSwitch = async (role: 'STUDENT' | 'FACULTY' | 'MENTOR' | 'RECRUITER') => {
    setRoleSwitchOpen(false);
    await demoLogin(role);
    if (role === 'STUDENT') navigate('/student/dashboard');
    else if (role === 'FACULTY') navigate('/faculty/dashboard');
    else if (role === 'MENTOR') navigate('/mentor/dashboard');
    else if (role === 'RECRUITER') navigate('/recruiter/dashboard');
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'STUDENT':
        return { label: 'Student / Scholar', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800' };
      case 'FACULTY':
        return { label: 'Faculty / Academician', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800' };
      case 'MENTOR':
        return { label: 'Expert Mentor', color: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-400 dark:border-teal-800' };
      case 'RECRUITER':
        return { label: 'Healthcare Industry', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800' };
      default:
        return { label: 'Guest Portal', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const badge = getRoleBadge(user?.role);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Left: Branding & Mobile toggle */}
            <div className="flex items-center gap-3">
              {user && (
                <button
                  onClick={onToggleSidebar}
                  className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Toggle Navigation Menu"
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}

              <Link to={user ? `/${user.role.toLowerCase()}/dashboard` : '/'} className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-lg bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:bg-emerald-800 transition-colors">
                  आ
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                      AYUSH Academia–Industry
                    </span>
                  </div>
                  <span className="text-[10px] tracking-wide text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    Ministry of Ayush • AIIA Collaboration Platform
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Medical Disclaimer (Desktop) */}
            <div className="hidden xl:block">
              <MedicalDisclaimerBadge />
            </div>

            {/* Right: Actions, Theme, Search, Notifications, User */}
            <div className="flex items-center gap-2">
              {/* Quick Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                title="Global Search (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search platform...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-500">
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Help Desk */}
              <button
                onClick={() => setHelpOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Academic & Technical Help Desk"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={`Switch to ${actualTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
                aria-label="Toggle Theme"
              >
                {actualTheme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              {/* Notifications (if user logged in) */}
              {user && (
                <button
                  onClick={() => setNotifOpen(true)}
                  className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                      {unreadCount}
                    </span>
                  )}
                </button>
              )}

              {/* Demo Role Switcher (Crucial for evaluation of all 4 portals) */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setRoleSwitchOpen(!roleSwitchOpen)}
                    className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${badge.color}`}
                  >
                    <span>{badge.label}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {roleSwitchOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50">
                      <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Switch Demo Portal View
                      </div>
                      <button
                        onClick={() => handleRoleSwitch('STUDENT')}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${user.role === 'STUDENT' ? 'font-bold text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}
                      >
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        <span>Student / Scholar Portal</span>
                      </button>
                      <button
                        onClick={() => handleRoleSwitch('FACULTY')}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${user.role === 'FACULTY' ? 'font-bold text-blue-600' : 'text-slate-700 dark:text-slate-300'}`}
                      >
                        <BookOpenCheck className="w-4 h-4 text-blue-600" />
                        <span>Faculty / Academician Portal</span>
                      </button>
                      <button
                        onClick={() => handleRoleSwitch('MENTOR')}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${user.role === 'MENTOR' ? 'font-bold text-teal-600' : 'text-slate-700 dark:text-slate-300'}`}
                      >
                        <Users className="w-4 h-4 text-teal-600" />
                        <span>Mentor Expert Portal</span>
                      </button>
                      <button
                        onClick={() => handleRoleSwitch('RECRUITER')}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${user.role === 'RECRUITER' ? 'font-bold text-indigo-600' : 'text-slate-700 dark:text-slate-300'}`}
                      >
                        <Building2 className="w-4 h-4 text-indigo-600" />
                        <span>Healthcare Recruiter Portal</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* User Avatar & Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1594824813521-82d24269e8bb?w=100&auto=format&fit=crop&q=80'}
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                    <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {user.firstName}
                    </span>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <UserCheck className="w-4 h-4 text-slate-400" />
                        <span>My Academic Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Portal Login
                  </Link>
                  <button
                    onClick={() => handleRoleSwitch('STUDENT')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                  >
                    Explore Portal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} onUpdateCount={setUnreadCount} />
      <HelpDeskModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
};
