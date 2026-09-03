import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  CheckSquare,
  BarChart3,
  BookOpen,
  FileText,
  Briefcase,
  Microscope,
  Users,
  FolderGit2,
  Video,
  Award,
  IdCard,
  FileCheck2,
  LineChart,
  User,
  PlusCircle,
  TrendingUp,
  Building,
  GraduationCap,
  CalendarCheck,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role;

  interface NavItem {
    label: string;
    to: string;
    icon: React.ReactNode;
    badge?: string;
  }

  interface NavSection {
    sectionTitle?: string;
    items: NavItem[];
  }

  let sections: NavSection[] = [];

  if (role === 'STUDENT') {
    sections = [
      {
        sectionTitle: 'Core',
        items: [
          { label: 'Dashboard', to: '/student/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'My Academic Profile', to: '/profile', icon: <User className="w-4 h-4" /> }
        ]
      },
      {
        sectionTitle: 'Career Pathways',
        items: [
          { label: 'Career Explorer', to: '/student/careers', icon: <Compass className="w-4 h-4" />, badge: 'Pathways' }
        ]
      },
      {
        sectionTitle: 'Skill Development Hub',
        items: [
          { label: 'Competency Assessment', to: '/student/assessment', icon: <CheckSquare className="w-4 h-4" /> },
          { label: 'Skill Gap Diagnostic', to: '/student/skill-gaps', icon: <BarChart3 className="w-4 h-4" /> }
        ]
      },
      {
        sectionTitle: 'Learning & Micro-Modules',
        items: [
          { label: 'Learning Hub & Courses', to: '/student/learning', icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Case-Based Scenarios', to: '/student/cases', icon: <FileText className="w-4 h-4" /> },
          { label: '5-Min Micro-Learning', to: '/student/videos', icon: <Video className="w-4 h-4" /> }
        ]
      },
      {
        sectionTitle: 'Opportunities & Experience',
        items: [
          { label: 'Internships & Clinical Roles', to: '/student/internships', icon: <Briefcase className="w-4 h-4" />, badge: 'Match' },
          { label: 'Research Projects & Grants', to: '/student/research', icon: <Microscope className="w-4 h-4" /> },
          { label: 'Live Industry Projects', to: '/student/projects', icon: <FolderGit2 className="w-4 h-4" /> },
          { label: 'Innovation Challenges', to: '/student/challenges', icon: <Award className="w-4 h-4" /> }
        ]
      },
      {
        sectionTitle: 'Mentorship & Guidance',
        items: [
          { label: 'Mentorship Hub', to: '/student/mentorship', icon: <Users className="w-4 h-4" /> }
        ]
      },
      {
        sectionTitle: 'Verified Records & Analytics',
        items: [
          { label: 'AYUSH Skill Passport', to: '/student/passport', icon: <IdCard className="w-4 h-4" />, badge: 'Verified' },
          { label: 'Document Vault', to: '/student/documents', icon: <FileCheck2 className="w-4 h-4" /> },
          { label: 'Growth Analytics & Trends', to: '/student/analytics', icon: <LineChart className="w-4 h-4" /> }
        ]
      }
    ];
  } else if (role === 'FACULTY') {
    sections = [
      {
        sectionTitle: 'Faculty Portal',
        items: [
          { label: 'Dashboard', to: '/faculty/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Student Skill Analytics', to: '/faculty/analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { label: 'Industry Demand Insights', to: '/faculty/industry-demand', icon: <TrendingUp className="w-4 h-4" /> },
          { label: 'Curriculum Insights', to: '/faculty/curriculum-insights', icon: <GraduationCap className="w-4 h-4" /> },
          { label: 'Collaboration Marketplace', to: '/faculty/collaboration', icon: <Building className="w-4 h-4" />, badge: 'Proposals' },
          { label: 'Faculty Opportunities (FDP)', to: '/faculty/opportunities', icon: <Briefcase className="w-4 h-4" /> },
          { label: 'Research Projects', to: '/student/research', icon: <Microscope className="w-4 h-4" /> },
          { label: 'Academic Profile', to: '/profile', icon: <User className="w-4 h-4" /> }
        ]
      }
    ];
  } else if (role === 'MENTOR') {
    sections = [
      {
        sectionTitle: 'Mentor Portal',
        items: [
          { label: 'Mentor Dashboard', to: '/mentor/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Active Mentees', to: '/mentor/mentees', icon: <Users className="w-4 h-4" /> },
          { label: 'Mentorship Sessions', to: '/mentor/sessions', icon: <CalendarCheck className="w-4 h-4" /> },
          { label: 'Career Goals Tracking', to: '/mentor/goals', icon: <Target className="w-4 h-4" /> },
          { label: 'Progress Reviews & Notes', to: '/mentor/feedback', icon: <FileCheck2 className="w-4 h-4" /> },
          { label: 'Mentor Profile', to: '/profile', icon: <User className="w-4 h-4" /> }
        ]
      }
    ];
  } else if (role === 'RECRUITER') {
    sections = [
      {
        sectionTitle: 'Industry Partner Portal',
        items: [
          { label: 'Recruiter Dashboard', to: '/recruiter/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Post Opportunity', to: '/recruiter/post-opportunity', icon: <PlusCircle className="w-4 h-4" /> },
          { label: 'All Opportunities', to: '/student/internships', icon: <Briefcase className="w-4 h-4" /> },
          { label: 'Application Pipeline', to: '/recruiter/applications', icon: <FileText className="w-4 h-4" />, badge: 'Pipeline' },
          { label: 'Candidate Search', to: '/recruiter/candidates', icon: <Users className="w-4 h-4" />, badge: 'Match' },
          { label: 'Faculty Collaboration', to: '/recruiter/collaboration', icon: <Building className="w-4 h-4" /> },
          { label: 'Innovation Challenges', to: '/student/challenges', icon: <Award className="w-4 h-4" /> },
          { label: 'Recruitment Analytics', to: '/recruiter/analytics', icon: <LineChart className="w-4 h-4" /> },
          { label: 'Organization Profile', to: '/profile', icon: <User className="w-4 h-4" /> }
        ]
      }
    ];
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-200 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* User Mini Role Banner */}
        <div className="p-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
            Current Portal
          </div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
            {role === 'STUDENT' && 'Ayurveda Student / Scholar'}
            {role === 'FACULTY' && 'All India Institute of Ayurveda Faculty'}
            {role === 'MENTOR' && 'Research & Clinical Mentor'}
            {role === 'RECRUITER' && 'Healthcare Industry Partner'}
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {section.sectionTitle && (
                <div className="px-3 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.sectionTitle}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-lg transition-colors group ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-200'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0">
                        {link.icon}
                      </span>
                      <span className="truncate">{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Institution Stamp */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 text-center">
          <div>Ministry of Ayush • AIIA</div>
          <div className="text-[10px] text-slate-400">Smart Automation Solution</div>
        </div>
      </aside>
    </>
  );
};
