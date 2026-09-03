import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Compass,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Users,
  Microscope,
  Award,
  IdCard,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  FileCheck,
  Calendar,
  Activity,
  ShieldCheck,
  Network
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { api } from '../../services/api.js';
import { SkillToProofPipeline } from '../../components/common/SkillToProofPipeline.js';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [profRes, statRes] = await Promise.all([
          api.getStudentProfile(),
          api.getStudentAnalytics()
        ]);
        if (profRes.success) setProfile(profRes.profile);
        if (statRes.success) setStats(statRes.analytics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Exact AYUSH Metric Scores as specified in requirements
  const careerReadinessScore = 78;
  const clinicalCompetencyScore = 82;
  const researchReadinessScore = 68;
  const professionalSkillsScore = 76;
  const industryExposureScore = 61;
  const profileCompletionScore = 92;

  // Career Readiness Sub-component Breakdown
  const readinessComponents = [
    { label: 'Domain Knowledge', score: 84, weight: '20%' },
    { label: 'Clinical / Practical Exposure', score: 82, weight: '20%' },
    { label: 'Research Skills', score: 68, weight: '15%' },
    { label: 'Professional Communication', score: 76, weight: '15%' },
    { label: 'Certifications', score: 80, weight: '10%' },
    { label: 'Internship Experience', score: 65, weight: '10%' },
    { label: 'Industry Exposure', score: 61, weight: '10%' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-700/80 text-emerald-100 border border-emerald-600">
            <span>BAMS Senior Scholar • AIIA New Delhi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {user?.firstName || 'Dr. Scholar'}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
            Your career target is currently set to{' '}
            <span className="font-bold underline decoration-emerald-400">
              {profile?.careerGoal || 'AYUSH Clinical Research & GCP'}
            </span>
            . Your overall readiness is calculated across 7 academic & industry dimensions.
          </p>
          <div className="pt-2 flex flex-wrap gap-2.5">
            <Link
              to="/student/skill-gaps"
              className="px-4 py-2 text-xs font-semibold bg-white text-emerald-900 rounded-lg hover:bg-emerald-50 transition-colors shadow-xs"
            >
              Analyze Skill Gaps
            </Link>
            <Link
              to="/student/passport"
              className="px-4 py-2 text-xs font-semibold bg-emerald-700/80 text-white rounded-lg hover:bg-emerald-600 transition-colors border border-emerald-500/50"
            >
              View AYUSH Skill Passport
            </Link>
          </div>
        </div>
      </div>

      {/* REQUIRED METRICS ROW (6 Key AYUSH Competency Indicators) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Competency & Career Readiness Overview
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            Career-development indicators (Non-clinical qualification)
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Career Readiness */}
          <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span className="truncate">Career Readiness</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">
              {careerReadinessScore}%
            </div>
            <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1 font-medium">
              Overall Index
            </div>
          </div>

          {/* 2. Clinical / Practical Competency */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span className="truncate">Clinical Competency</span>
              <Activity className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {clinicalCompetencyScore}%
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              620 Hours Logged
            </div>
          </div>

          {/* 3. Research Readiness */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span className="truncate">Research Readiness</span>
              <Microscope className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {researchReadinessScore}%
            </div>
            <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-1">
              GCP Assessment Next
            </div>
          </div>

          {/* 4. Professional Skills */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span className="truncate">Professional Skills</span>
              <Award className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {professionalSkillsScore}%
            </div>
            <div className="text-[10px] text-purple-600 dark:text-purple-400 mt-1">
              Communication & Ethics
            </div>
          </div>

          {/* 5. Industry Exposure */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span className="truncate">Industry Exposure</span>
              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {industryExposureScore}%
            </div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
              1 Live Industry Project
            </div>
          </div>

          {/* 6. Profile Completion */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span className="truncate">Profile Completion</span>
              <FileCheck className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {profileCompletionScore}%
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
              AIIA Verified
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: YOUR NEXT BEST ACTION */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/20 border border-amber-300 dark:border-amber-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
            <Sparkles className="w-3 h-3 text-amber-700 dark:text-amber-300" />
            <span>Your Next Best Action</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Complete Research Methodology Assessment
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Reason:</span> This competency is required by 8 of your recommended research opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => navigate('/student/assessment')}
            className="px-4 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-xs"
          >
            Take Assessment
          </button>
          <button
            onClick={() => navigate('/student/skill-gaps')}
            className="px-4 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            View Skill Gap
          </button>
        </div>
      </div>

      {/* CORE UNIQUE ARCHITECTURE: SKILL -> LEARNING -> EXPERIENCE -> PROOF */}
      <SkillToProofPipeline />

      {/* SECTION 12: SMART CAREER ROADMAP */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Personalized Smart Career Roadmap
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Personalized sequence of milestones automatically adapted to your current academic stage and career goal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Career Target:</span>
            <select
              value={profile?.careerGoal || 'AYUSH Clinical Research & GCP'}
              onChange={async (e) => {
                const newGoal = e.target.value;
                setProfile((prev: any) => ({ ...prev, careerGoal: newGoal }));
                try {
                  await api.updateStudentProfile({ careerGoal: newGoal });
                } catch (err) {
                  console.error(err);
                }
              }}
              className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-emerald-500 outline-hidden"
            >
              <option value="AYUSH Clinical Research & GCP">AYUSH Clinical Research & GCP</option>
              <option value="Hospital & Panchakarma Clinical Practice">Hospital & Panchakarma Clinical Practice</option>
              <option value="ASU Pharmaceutical Quality Assurance">ASU Pharmaceutical Quality Assurance</option>
              <option value="Preventive Healthcare & Public Health Policy">Preventive Healthcare & Public Health Policy</option>
              <option value="AYUSH Digital Health & Medical Informatics">AYUSH Digital Health & Medical Informatics</option>
              <option value="Smart Automation & AYUSH MedTech">Smart Automation & AYUSH MedTech</option>
            </select>
          </div>
        </div>

        {/* Roadmap Progress Indicator */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-slate-100">Current Academic Status:</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Final Year BAMS • AIIA New Delhi
              </span>
            </div>
            <div className="font-bold text-emerald-700 dark:text-emerald-400">
              68% Milestone Progress
            </div>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div className="h-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" style={{ width: '68%' }} />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Action: Complete GCP Assessment to unlock Phase 4 Institutional Clinical Internship.</span>
            </div>
            <span className="font-mono">Milestone 3 of 5 In Progress</span>
          </div>
        </div>

        {/* Sequential Milestone Stepper */}
        <div className="space-y-3 pt-2">
          {[
            {
              step: 1,
              title: 'Complete Good Clinical Practice (GCP) Module',
              status: 'COMPLETED',
              badge: 'Completed',
              desc: 'ICH-GCP E6 (R2) ethical standards and clinical trial guidelines in ASU research.',
              date: 'Verified Oct 2024'
            },
            {
              step: 2,
              title: 'Submit Protocol Draft to Institutional Mentor',
              status: 'COMPLETED',
              badge: 'Completed',
              desc: 'Initial research protocol on classical formulation safety verified by Dr. Rajeshwar Sharma.',
              date: 'Approved Dec 2024'
            },
            {
              step: 3,
              title: 'AYUSH Clinical Competency Assessment',
              status: 'IN_PROGRESS',
              badge: 'In Progress - Take Now',
              desc: 'Diagnostic evaluation in Nadi Pariksha, pharmacovigilance, and protocol adverse event monitoring.',
              action: '/student/assessment'
            },
            {
              step: 4,
              title: 'Institutional Clinical Internship Application',
              status: 'UPCOMING',
              badge: 'Upcoming (Unlocks after Assessment)',
              desc: 'Competitive placement at AIIA Clinical Research Unit or affiliated teaching hospital.',
              action: '/student/internships'
            },
            {
              step: 5,
              title: 'Industry Research Project Placement',
              status: 'TARGET',
              badge: 'Target Q3',
              desc: 'Extramural research project collaboration with CCRAS or ASU pharmaceutical research lab.',
              action: '/student/research'
            }
          ].map((m) => (
            <div
              key={m.step}
              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                m.status === 'COMPLETED'
                  ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10'
                  : m.status === 'IN_PROGRESS'
                  ? 'border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 ring-1 ring-amber-400'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 opacity-80'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    m.status === 'COMPLETED'
                      ? 'bg-emerald-600 text-white'
                      : m.status === 'IN_PROGRESS'
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {m.status === 'COMPLETED' ? '✓' : m.step}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                      {m.title}
                    </h3>
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        m.status === 'COMPLETED'
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                          : m.status === 'IN_PROGRESS'
                          ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {m.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 self-end sm:self-auto">
                {m.status === 'COMPLETED' && (
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                    {m.date}
                  </span>
                )}
                {m.status === 'IN_PROGRESS' && m.action && (
                  <button
                    onClick={() => navigate(m.action)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Take Assessment Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {m.status === 'UPCOMING' && m.action && (
                  <button
                    onClick={() => navigate(m.action)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Preview Requirements
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 13 & 37: EXPLAINABLE "RECOMMENDED FOR YOU" */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Recommended For You (Explainable Match Engine)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Transparent, algorithmic matches showing exactly why each internship, research role, or module aligns with your profile.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            Powered by AYUSH Academic Competency Matching
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recommendation 1: Internship */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                  Internship Opportunity
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  92% Match
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                AIIA Integrative Clinical Trial Co-Investigator Intern
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                All India Institute of Ayurveda • Clinical Trial Unit, New Delhi
              </p>

              {/* Explainable Why Recommended Badge */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Why recommended:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Matches your Clinical Research career goal, BAMS 4th year academic standing, and your verified GCP ethics module.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">Stipend: ₹18,000 / mo</span>
              <button
                onClick={() => navigate('/student/internships')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Apply with Passport</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Recommendation 2: Research Project */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-900">
                  Extramural Research
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  88% Match
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Standardization & Heavy Metal Assays in Classical Rasaushadhis
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                CCRAS & AIIA Collaborative Research Lab • Central Pharmacy Unit
              </p>

              {/* Explainable Why Recommended Badge */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Why recommended:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  High alignment with your demonstrated competencies in herbal extraction protocols and 82% practical competency benchmark.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">Duration: 6 Months</span>
              <button
                onClick={() => navigate('/student/research')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>View Research Grant</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Recommendation 3: Learning Module */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900">
                  Targeted Learning Module
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  95% Match
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                CTRI Protocol Filing & Clinical Trial Registry Compliance
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                AIIA Academic Portal • 4 Accredited CME Credits
              </p>

              {/* Explainable Why Recommended Badge */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Why recommended:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Directly bridges your diagnostic gap in CTRI trial registry filing, which is required by 8 of your recommended internships.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">Paced: 3.5 Hours</span>
              <button
                onClick={() => navigate('/student/learning')}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-1"
              >
                <span>Start Module</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Recommendation 4: Clinical Research Mentor */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                  Institutional Mentor
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  91% Match
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Dr. Rajeshwar Sharma • Lead Investigator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Professor & Clinician Scientist • Department of Kayachikitsa, AIIA
              </p>

              {/* Explainable Why Recommended Badge */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Why recommended:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Expertise aligns with your selected career goal in Clinical Research; currently supervising 6 BAMS scholars in Phase-II trials.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">Next Slot: Tomorrow 3 PM</span>
              <button
                onClick={() => navigate('/student/mentorship')}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-1"
              >
                <span>Book 15-Min Connect</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Career Readiness Breakdown & Target Pathway */}
        <div className="lg:col-span-2 space-y-6">
          {/* UNIQUE FEATURE: AYUSH CAREER READINESS INDICATOR BREAKDOWN */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    AYUSH Career Readiness Score Breakdown
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Calculated based on verified academic logs, clinical hours, assessments, and industry exposure.
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Score: {careerReadinessScore}%
              </span>
            </div>

            <div className="space-y-2.5">
              {readinessComponents.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.label} <span className="text-slate-400 font-normal">({item.weight})</span>
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${
                        item.score >= 80
                          ? 'bg-emerald-600'
                          : item.score >= 70
                          ? 'bg-teal-600'
                          : item.score >= 60
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Institutional Notice:</strong> This score is an indicative career-development metric to assist in healthcare industry alignment and does not constitute a statutory medical licensing qualification.
              </span>
            </div>
          </div>

          {/* Target Pathway Summary Card */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Active Career Pathway: Clinical Research
                </h3>
              </div>
              <Link
                to="/student/careers"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View 10 Pathways Roadmap
              </Link>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  AYUSH Clinical Research & Good Clinical Practice (GCP)
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  High Alignment (88%)
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Prepares scholars for clinical trial monitoring, Phase II/III trial coordination, ethical submissions, and multi-centric Ayurvedic clinical documentation.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300">
                  Clinical Trial Monitoring
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300">
                  Schedule Y & ICMR Guidelines
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300">
                  ICH-GCP E6 (R2)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Upcoming Mentorship & Passport Card */}
        <div className="space-y-6">
          {/* Mentorship Upcoming */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Next Mentorship Session</span>
              </h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                Confirmed
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                15-Minute Focused Industry Connect: GCP Protocol Design
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Mentor: Dr. Rajeshwar Sharma (AIIA Clinician Scientist)
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Tomorrow at 3:00 PM (15 mins)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                <Link
                  to="/student/mentorship"
                  className="w-full py-1.5 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded hover:bg-emerald-50"
                >
                  View Session Brief
                </Link>
              </div>
            </div>
          </div>

          {/* AYUSH Skill Passport Quick Widget */}
          <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
            <div className="flex items-center gap-2">
              <IdCard className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  AYUSH Skill Passport
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {profile?.passportNumber || 'AYUSH-AIIA-2025-08492'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your institutional record verified by the All India Institute of Ayurveda. Contains your verified competencies, clinical hours, and mentor endorsements.
            </p>

            <div className="pt-1">
              <Link
                to="/student/passport"
                className="w-full py-2 px-3 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Open Skill Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

