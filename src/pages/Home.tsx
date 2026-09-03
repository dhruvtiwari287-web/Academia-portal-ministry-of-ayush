import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpenCheck,
  Users,
  Building2,
  Compass,
  CheckCircle2,
  Microscope,
  Briefcase,
  IdCard,
  ArrowRight,
  ShieldCheck,
  FileText,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

export const Home: React.FC = () => {
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemo = async (role: 'STUDENT' | 'FACULTY' | 'MENTOR' | 'RECRUITER') => {
    await demoLogin(role);
    navigate(`/${role.toLowerCase()}/dashboard`);
  };

  const roles = [
    {
      role: 'STUDENT' as const,
      title: 'Students & Scholars',
      subtitle: 'UG / PG / Interns / Researchers',
      description: 'Explore verified AYUSH career pathways, complete competency assessments, bridge skill gaps with accredited modules, connect with mentors, and obtain verified Skill Passports.',
      icon: <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
      actionText: 'Enter Student Portal',
      link: '/login?role=STUDENT'
    },
    {
      role: 'FACULTY' as const,
      title: 'Faculty & Academicians',
      subtitle: 'Professors / Researchers / Guides',
      description: 'Analyze student competency readiness, review industry skill demand trends, gain actionable curriculum insights, and collaborate on joint research and FDPs.',
      icon: <BookOpenCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60',
      actionText: 'Enter Faculty Portal',
      link: '/login?role=FACULTY'
    },
    {
      role: 'MENTOR' as const,
      title: 'Mentors & Clinical Experts',
      subtitle: 'Domain Experts / Senior Clinicians',
      description: 'Review mentee profiles with explainable compatibility, structure milestone-driven career goals, conduct scheduled advisory sessions, and record evaluative feedback.',
      icon: <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60',
      actionText: 'Enter Mentor Portal',
      link: '/login?role=MENTOR'
    },
    {
      role: 'RECRUITER' as const,
      title: 'Healthcare & Industry',
      subtitle: 'Research Labs / Pharma / Hospitals',
      description: 'Publish research fellowships and clinical internships, specify required competencies, evaluate candidates using transparent compatibility match scores, and track applications.',
      icon: <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60',
      actionText: 'Enter Industry Portal',
      link: '/login?role=RECRUITER'
    }
  ];

  const disciplines = [
    { name: 'Ayurveda', code: 'Ayu', focus: 'Kayachikitsa, Panchakarma, Dravyaguna, Rasashastra, Shalya' },
    { name: 'Yoga & Naturopathy', code: 'Yoga', focus: 'Therapeutic Yoga, Hydrotherapy, Clinical Lifestyle Protocols' },
    { name: 'Unani', code: 'Unani', focus: 'Ilaj-bil-Tadbeer, Moalajat, Pharmacognosy, Ilmul Advia' },
    { name: 'Siddha', code: 'Siddha', focus: 'Varmam, Maruthuvam, Gunapadam, Herbal-Mineral Alchemy' },
    { name: 'Sowa-Rigpa', code: 'Sowa', focus: 'Himalayan Traditional Medicine, Pulse Diagnosis, Pharmacology' },
    { name: 'Homoeopathy', code: 'Homoeo', focus: 'Materia Medica, Organon, Repertory, Chronic Care Research' }
  ];

  const spotlights = [
    {
      title: 'AYUSH Clinical Research & GCP',
      category: 'Research & Trials',
      overview: 'Conducting phase-II/III multi-center trials according to ICMR and AYUSH Good Clinical Practice guidelines.',
      competencies: ['Research Methodology', 'Research Ethics', 'Clinical Reasoning']
    },
    {
      title: 'Herbal Drug Standardization & QC',
      category: 'Pharmaceutical Industry',
      overview: 'Chromatographic fingerprinting, heavy metal profiling, and regulatory compliance under Ayurvedic Pharmacopoeia.',
      competencies: ['Quality Assurance', 'Analytical Chemistry', 'Schedule T GMP']
    },
    {
      title: 'Digital Health & NAMASTE Informatics',
      category: 'Healthcare Technology',
      overview: 'Standardized electronic health records, dual classification with ICD-11, and Ayush Grid integration.',
      competencies: ['Digital Health Awareness', 'Data Literacy', 'Terminology Mapping']
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ministry of Ayush • All India Institute of Ayurveda (AIIA)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              Connecting AYUSH Education with Research, Skills & Healthcare Opportunities
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              A national academic–industry collaboration ecosystem bridging classical medical education with clinical trials, pharmaceutical standardization, mentorship, and accredited career pathways.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/student/careers"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Career Pathways</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors"
              >
                <span>Institutional Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Separate Role Access Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Four Dedicated Role-Based Portals
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Choose your role to access personalized dashboards, tools, and workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map(r => (
            <div
              key={r.role}
              className={`p-6 rounded-2xl border ${r.bg} flex flex-col justify-between transition-all hover:shadow-md`}
            >
              <div>
                <div className="p-3 w-fit rounded-xl bg-white dark:bg-slate-900 shadow-xs mb-4">
                  {r.icon}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {r.subtitle}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-2">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {r.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <button
                  onClick={() => handleQuickDemo(r.role)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Continue as {r.role === 'RECRUITER' ? 'Recruiter' : r.role.charAt(0) + r.role.slice(1).toLowerCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  to={r.link}
                  className="block text-center text-[11px] text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Official Password Sign In
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Connected Ecosystem Flowchart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Connected Learning & Placement Journey
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              One Unified Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              From academic enrollment to competency assessment, mentorship, research, and industry opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            {[
              { step: '1', title: 'Student Profile', icon: <GraduationCap className="w-4 h-4 mx-auto" /> },
              { step: '2', title: 'Career Exploration', icon: <Compass className="w-4 h-4 mx-auto" /> },
              { step: '3', title: 'Assessment & Gap', icon: <Activity className="w-4 h-4 mx-auto" /> },
              { step: '4', title: 'Learning Hub', icon: <FileText className="w-4 h-4 mx-auto" /> },
              { step: '5', title: 'Mentorship', icon: <Users className="w-4 h-4 mx-auto" /> },
              { step: '6', title: 'Research / Project', icon: <Microscope className="w-4 h-4 mx-auto" /> },
              { step: '7', title: 'Internship', icon: <Briefcase className="w-4 h-4 mx-auto" /> },
              { step: '8', title: 'Skill Passport', icon: <IdCard className="w-4 h-4 mx-auto" /> }
            ].map(node => (
              <div
                key={node.step}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-1.5"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">
                  {node.step}
                </div>
                <div className="text-emerald-600 dark:text-emerald-400">{node.icon}</div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  {node.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AYUSH Disciplines Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Recognized AYUSH Medical Disciplines
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Supporting traditional systems under the statutory frameworks of the Ministry of Ayush
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {disciplines.map(d => (
            <div
              key={d.name}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-xs flex-shrink-0">
                {d.code}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{d.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                  {d.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Career Spotlight</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">High-demand opportunities in traditional medicine</p>
          </div>
          <Link
            to="/student/careers"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View all pathways</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlights.map(s => (
            <div
              key={s.title}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {s.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {s.overview}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-medium text-slate-400 mb-1.5">Key Competencies:</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.competencies.map(c => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency / Demo Notice Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Platform Notice:</strong> Developed for All India Institute of Ayurveda & Ministry of Ayush Smart Automation evaluation. Seed datasets clearly marked as Demo Data.
            </span>
          </div>
          <div className="font-mono text-[11px]">Build v1.0.0-PROD</div>
        </div>
      </section>
    </div>
  );
};
