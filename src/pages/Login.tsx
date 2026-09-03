import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpenCheck,
  Users,
  Building2,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { Role } from '../types/index.js';

export const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, demoLogin, isLoading, user } = useAuth();

  const initialRole = (searchParams.get('role')?.toUpperCase() as Role) || 'STUDENT';
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Preset credentials for easy one-click testing
  const presets: Record<Role, { email: string; pass: string; title: string; desc: string }> = {
    STUDENT: {
      email: 'student.ayush@aiia.gov.in',
      pass: 'AyushStudent@2025',
      title: 'Student & Scholar Portal',
      desc: 'BAMS / MD / Ph.D. scholars, interns, and academic researchers'
    },
    FACULTY: {
      email: 'faculty.kayachikitsa@aiia.gov.in',
      pass: 'AyushFaculty@2025',
      title: 'Faculty & Academicians Portal',
      desc: 'Professors, department heads, curriculum directors, and guides'
    },
    MENTOR: {
      email: 'mentor.research@aiia.gov.in',
      pass: 'AyushMentor@2025',
      title: 'Mentor & Clinical Experts Portal',
      desc: 'Clinical investigators, pharmacovigilance leads, senior clinicians'
    },
    RECRUITER: {
      email: 'recruiter@ayurvedapharma.com',
      pass: 'AyushIndustry@2025',
      title: 'Healthcare Industry & Recruiters',
      desc: 'Pharmaceutical R&D, clinical trial centers, AYUSH hospitals, wellness'
    },
    ADMIN: {
      email: 'admin@aiia.gov.in',
      pass: 'AdminAyush@2025',
      title: 'Administrative Portal',
      desc: 'Platform governance, accreditation audits & system settings'
    }
  };

  useEffect(() => {
    setEmail(presets[selectedRole].email);
    setPassword(presets[selectedRole].pass);
    setError(null);
  }, [selectedRole]);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate(`/${user.role.toLowerCase()}/dashboard`);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password, selectedRole);
      navigate(`/${selectedRole.toLowerCase()}/dashboard`);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please verify your role and password.');
    }
  };

  const handleQuickOneClick = async () => {
    setError(null);
    try {
      await demoLogin(selectedRole);
      navigate(`/${selectedRole.toLowerCase()}/dashboard`);
    } catch (err: any) {
      setError(err.message || 'Demo sign in failed.');
    }
  };

  const tabs: { role: Role; label: string; icon: React.ReactNode }[] = [
    { role: 'STUDENT', label: 'Student', icon: <GraduationCap className="w-4 h-4" /> },
    { role: 'FACULTY', label: 'Faculty', icon: <BookOpenCheck className="w-4 h-4" /> },
    { role: 'MENTOR', label: 'Mentor', icon: <Users className="w-4 h-4" /> },
    { role: 'RECRUITER', label: 'Industry', icon: <Building2 className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-0">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ministry of Ayush • AIIA Secure Authentication</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Academic–Industry Portal Login
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Select your institutional role to access role-specific workflows
        </p>
      </div>

      {/* Role Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
        {tabs.map(tab => (
          <button
            key={tab.role}
            onClick={() => setSelectedRole(tab.role)}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
              selectedRole === tab.role
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Login Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {presets[selectedRole].title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {presets[selectedRole].desc}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick instant entry button */}
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Instant Demonstration Mode
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold">
              Pre-configured
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Instantly bypass manual input and access the full {selectedRole.toLowerCase()} portal with seeded Ministry of Ayush competencies, applications, and documents.
          </p>
          <button
            type="button"
            onClick={handleQuickOneClick}
            disabled={isLoading}
            className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>One-Click Sign In as {selectedRole}</span>
              </>
            )}
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-slate-900 px-2 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Or Sign In With Password
          </span>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Sign In with Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
