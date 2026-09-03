import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  Award,
  Microscope,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  FolderPlus,
  BookOpen
} from 'lucide-react';
import { api } from '../../services/api.js';

interface CohortStudent {
  id: string;
  name: string;
  rollNumber: string;
  discipline: string;
  year: number;
  readinessScore: number;
  clinicalHours: number;
  pendingEndorsements: number;
  status: 'On Track' | 'Needs Attention' | 'Exceeding';
}

export const FacultyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'COHORT' | 'ENDORSEMENTS' | 'RESEARCH_PROJECTS' | 'CURRICULUM'>('COHORT');
  const [cohort, setCohort] = useState<CohortStudent[]>([
    {
      id: 'stu-1',
      name: 'Aarav Sharma',
      rollNumber: 'AIIA-2022-BAMS-042',
      discipline: 'Ayurveda (BAMS)',
      year: 4,
      readinessScore: 88,
      clinicalHours: 620,
      pendingEndorsements: 2,
      status: 'Exceeding'
    },
    {
      id: 'stu-2',
      name: 'Priyanka Patel',
      rollNumber: 'AIIA-2022-BAMS-089',
      discipline: 'Ayurveda (BAMS)',
      year: 4,
      readinessScore: 74,
      clinicalHours: 540,
      pendingEndorsements: 3,
      status: 'On Track'
    },
    {
      id: 'stu-3',
      name: 'Vikramaditya Joshi',
      rollNumber: 'AIIA-2023-BAMS-011',
      discipline: 'Ayurveda (BAMS)',
      year: 3,
      readinessScore: 61,
      clinicalHours: 320,
      pendingEndorsements: 1,
      status: 'Needs Attention'
    }
  ]);

  const [endorsements, setEndorsements] = useState([
    {
      id: 'end-1',
      studentName: 'Aarav Sharma',
      competency: 'Panchakarma Clinical Protocol Verification (Vamana & Virechana)',
      rotationHospital: 'AIIA Tertiary Hospital',
      supervisorHours: '120 Hours Logged',
      status: 'PENDING'
    },
    {
      id: 'end-2',
      studentName: 'Priyanka Patel',
      competency: 'Schedule T GMP In-Process Quality Controls',
      rotationHospital: 'AIIA Pharmacy Quality Control Laboratory',
      supervisorHours: '80 Hours Logged',
      status: 'PENDING'
    }
  ]);

  const handleEndorse = (id: string) => {
    setEndorsements(prev => prev.filter(e => e.id !== id));
    alert('Institutional competency officially endorsed and stamped into the Scholar’s Skill Passport!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Faculty & Clinical Chair Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            AIIA Faculty Governance & Mentorship Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Institutional oversight of student cohorts, formal competency sign-offs, research project administration, and industry curriculum alignment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ENDORSEMENTS')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Pending Endorsements ({endorsements.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Cohort Under Mentorship
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono">
            48 Scholars
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            91.7% active in clinical rotations
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Pending Institutional Sign-offs
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1 font-mono">
            {endorsements.length} Requests
          </div>
          <div className="text-xs text-slate-500 mt-1">Competency Passport verification</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Extramural Studies
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 font-mono">
            4 Projects
          </div>
          <div className="text-xs text-slate-500 mt-1">₹48 Lakhs total grant allocation</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Curriculum Industry Match
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-1 font-mono">
            92.8%
          </div>
          <div className="text-xs text-slate-500 mt-1">Schedule T & GCP compliance</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { key: 'COHORT', label: 'Cohort Performance Roster' },
          { key: 'ENDORSEMENTS', label: `Endorsement Requests (${endorsements.length})` },
          { key: 'RESEARCH_PROJECTS', label: 'Research & Extramural Trials' },
          { key: 'CURRICULUM', label: 'Curriculum & Industry Co-Design' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === tab.key
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Cohort Roster */}
      {activeTab === 'COHORT' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Department of Kayachikitsa & Panchakarma — BAMS Cohort 2022
              </h3>
              <p className="text-xs text-slate-500">
                Real-time tracking of student readiness scores and hospital rotation completion.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Roll Number</th>
                  <th className="py-3 px-3">Year</th>
                  <th className="py-3 px-3">Readiness Index</th>
                  <th className="py-3 px-3">Clinical Hours</th>
                  <th className="py-3 px-3">Cohort Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {cohort.map(stu => (
                  <tr key={stu.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">
                      {stu.name}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">{stu.rollNumber}</td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">Year {stu.year}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {stu.readinessScore}%
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                      {stu.clinicalHours} hrs
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          stu.status === 'Exceeding'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : stu.status === 'On Track'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {stu.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => alert(`Opening comprehensive institutional logbook for ${stu.name}`)}
                        className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        View Logbook
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Endorsement Requests */}
      {activeTab === 'ENDORSEMENTS' && (
        <div className="space-y-4">
          {endorsements.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              No pending endorsement requests at this time. All competencies signed off.
            </div>
          ) : (
            endorsements.map(end => (
              <div
                key={end.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      Awaiting Institutional Seal
                    </span>
                    <span className="text-xs text-slate-400">{end.supervisorHours}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {end.competency}
                  </h4>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Candidate: <strong>{end.studentName}</strong> • Verified at: {end.rotationHospital}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEndorse(end.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Endorse & Sign Off</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Research Projects */}
      {activeTab === 'RESEARCH_PROJECTS' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Departmental Extramural Studies & Multi-Center Clinical Trials
            </h3>
            <button
              onClick={() => alert('Proposal creation wizard opened.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit New Trial Protocol</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>Multi-Center Evaluation of Ashwagandha in Geriatric Cognitive Decline</span>
                <span className="text-emerald-600">Active Phase 2</span>
              </div>
              <p className="text-slate-500">
                Principal Investigator: Dr. Rajeshwar Sharma • Funding Agency: Ministry of Ayush Extra-Mural Research Scheme (₹18 Lakhs)
              </p>
              <div className="text-[11px] text-slate-400 pt-1">
                Allocated Student Research Fellows: Aarav Sharma, Priyanka Patel
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Curriculum & Industry Co-Design */}
      {activeTab === 'CURRICULUM' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Curriculum Alignment with Industry Benchmarks (AIIA - Phyto-Pharma Standards)
          </h3>
          <p className="text-xs text-slate-500">
            Mapping NCISM competencies against active industry internship requirements.
          </p>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-800 dark:text-slate-200 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
              <BookOpen className="w-4 h-4" />
              <span>Recommended Curriculum Enhancements (Academic Year 2025-26)</span>
            </div>
            <p>
              Analysis of 18 pharmaceutical recruiter postings indicates a 42% gap in candidate exposure to <strong>Ayush Grid / Electronic Health Record data standards</strong> and <strong>Schedule T GMP in-process batch documentation</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => alert('Co-design proposal draft generated for NCISM Board of Studies.')}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
              >
                Draft Curriculum Amendment Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
