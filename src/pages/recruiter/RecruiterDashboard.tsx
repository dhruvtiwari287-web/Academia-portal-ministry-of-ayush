import React, { useState, useEffect } from 'react';
import {
  Building2,
  Briefcase,
  Users,
  Search,
  CheckCircle2,
  Sparkles,
  Award,
  IdCard,
  PlusCircle,
  FileCheck2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2
} from 'lucide-react';
import { Opportunity, Application } from '../../types/index.js';
import { api } from '../../services/api.js';

interface CandidateProfile {
  id: string;
  name: string;
  discipline: string;
  institution: string;
  readinessScore: number;
  clinicalHours: number;
  verifiedCompetencies: string[];
  matchScore: number;
}

export const RecruiterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'POSTINGS' | 'CANDIDATE_SEARCH' | 'APPLICATIONS'>('POSTINGS');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // New posting form modal
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState('AYUSH Clinical Research');
  const [newLocation, setNewLocation] = useState('New Delhi (AIIA Campus)');
  const [newMode, setNewMode] = useState<'On-site' | 'Hybrid' | 'Remote'>('On-site');
  const [newDuration, setNewDuration] = useState('6 Months');
  const [newStipend, setNewStipend] = useState('₹30,000 / month');
  const [newDescription, setNewDescription] = useState('');
  const [creatingPosting, setCreatingPosting] = useState(false);

  // Candidate Search
  const [searchDiscipline, setSearchDiscipline] = useState('Ayurveda');
  const [minReadiness, setMinReadiness] = useState(75);
  const [candidates, setCandidates] = useState<CandidateProfile[]>([
    {
      id: 'cand-1',
      name: 'Aarav Sharma',
      discipline: 'Ayurveda (BAMS)',
      institution: 'All India Institute of Ayurveda, New Delhi',
      readinessScore: 88,
      clinicalHours: 620,
      verifiedCompetencies: [
        'Ayurvedic Clinical Protocol (Panchakarma)',
        'Schedule T GMP Compliance',
        'GCP Clinical Trial Monitoring'
      ],
      matchScore: 94
    },
    {
      id: 'cand-2',
      name: 'Priyanka Patel',
      discipline: 'Ayurveda (BAMS)',
      institution: 'All India Institute of Ayurveda, New Delhi',
      readinessScore: 78,
      clinicalHours: 540,
      verifiedCompetencies: [
        'Phytochemical Standardization (HPTLC)',
        'Pharmacovigilance Signal Detection'
      ],
      matchScore: 86
    }
  ]);

  const loadData = async () => {
    try {
      const [oppRes, appRes] = await Promise.all([
        api.getOpportunities(),
        api.getApplications()
      ]);
      if (oppRes.success) setOpportunities(oppRes.opportunities);
      if (appRes.success) setApplications(appRes.applications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePosting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setCreatingPosting(true);
    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      recruiterId: 'recruiter-dabur',
      title: newTitle,
      organization: 'Dabur AYUSH Clinical Research Division',
      organizationType: 'Industry Leader',
      opportunityType: 'INTERNSHIP',
      domain: newDomain,
      location: newLocation,
      mode: newMode,
      duration: newDuration,
      stipend: newStipend,
      description: newDescription,
      eligibility: 'Final Year BAMS or MD/MS Scholars',
      deadline: '2025-07-31',
      requiredCompetencies: ['Schedule T GMP Compliance', 'GCP'],
      preferredCompetencies: ['Clinical Documentation'],
      status: 'ACTIVE',
      compatibilityScore: 92,
      postedBy: 'recruiter-dabur',
      applicationQuestions: ['Explain your familiarity with Schedule T batch logging.']
    };

    setOpportunities([newOpp, ...opportunities]);
    setShowNewJobModal(false);
    setCreatingPosting(false);
    setNewTitle('');
    setNewDescription('');
    alert('Opportunity posting published across the national AYUSH scholar network!');
  };

  const handleUpdateAppStatus = (appId: string, newStatus: Application['status']) => {
    setApplications(prev =>
      prev.map(a =>
        a.id === appId
          ? {
              ...a,
              status: newStatus,
              history: [
                ...a.history,
                {
                  status: newStatus,
                  timestamp: new Date().toISOString(),
                  note: `Updated by Recruiter: ${newStatus}`
                }
              ]
            }
          : a
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Healthcare Industry & Pharmaceutical Recruiter Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            AYUSH Talent Acquisition & Placement Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Publish clinical postings, search verified candidate repositories with tamper-evident Skill Passports, and manage application pipelines.
          </p>
        </div>

        <button
          onClick={() => setShowNewJobModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Clinical / QA Opportunity</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Openings
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono">
            {opportunities.length}
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            Across 4 specialized domains
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Candidates Applied
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-1 font-mono">
            18
          </div>
          <div className="text-xs text-slate-500 mt-1">Verified Skill Passports attached</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Interviews Scheduled
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 font-mono">
            4
          </div>
          <div className="text-xs text-slate-500 mt-1">For Clinical Research Associate</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            AIIA Verification Rate
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1 font-mono">
            100%
          </div>
          <div className="text-xs text-purple-600 font-semibold mt-1">
            Zero self-reported fabrications
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('POSTINGS')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'POSTINGS'
              ? 'bg-emerald-700 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          My Organization Postings ({opportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('CANDIDATE_SEARCH')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
            activeTab === 'CANDIDATE_SEARCH'
              ? 'bg-emerald-700 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Verified Scholar Search</span>
        </button>
        <button
          onClick={() => setActiveTab('APPLICATIONS')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'APPLICATIONS'
              ? 'bg-emerald-700 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Candidate Pipeline ({applications.length})
        </button>
      </div>

      {/* Tab 1: Postings */}
      {activeTab === 'POSTINGS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map(opp => (
            <div
              key={opp.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    {opp.domain} • {opp.mode}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    Active
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {opp.title}
                </h3>
                <div className="text-xs text-slate-500 mb-3">
                  {opp.location} • Stipend: {opp.stipend} • Duration: {opp.duration}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {opp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Deadline: {new Date(opp.deadline).toLocaleDateString()}
                </span>
                <button
                  onClick={() => setActiveTab('APPLICATIONS')}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>View Applicants (3)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Candidate Search with Verified Filter */}
      {activeTab === 'CANDIDATE_SEARCH' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                  Discipline
                </label>
                <select
                  value={searchDiscipline}
                  onChange={e => setSearchDiscipline(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                >
                  <option value="Ayurveda">Ayurveda (BAMS / MD)</option>
                  <option value="Yoga">Yoga & Naturopathy (BNYS)</option>
                  <option value="Unani">Unani (BUMS)</option>
                  <option value="Siddha">Siddha (BSMS)</option>
                  <option value="Homeopathy">Homeopathy (BHMS)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                  Minimum Readiness Score: {minReadiness}%
                </label>
                <input
                  type="range"
                  min={50}
                  max={95}
                  value={minReadiness}
                  onChange={e => setMinReadiness(Number(e.target.value))}
                  className="w-36 accent-emerald-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4" />
              <span>AIIA Institutional Verification Filter Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {candidates.map(cand => (
              <div
                key={cand.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        {cand.discipline}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                        {cand.name}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">{cand.institution}</div>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{cand.matchScore}% Match</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 mb-3">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Readiness Score:
                      </span>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                        {cand.readinessScore}%
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Verified Clinical Hours:
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {cand.clinicalHours} hrs
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Verified Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.verifiedCompetencies.map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{c}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => alert(`Opening Official AYUSH Skill Passport verification hash for ${cand.name}`)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <IdCard className="w-3.5 h-3.5" />
                    <span>Inspect Skill Passport</span>
                  </button>

                  <button
                    onClick={() => alert(`Interview invite dispatched to ${cand.name}`)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800"
                  >
                    Invite for Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Candidate Pipeline */}
      {activeTab === 'APPLICATIONS' && (
        <div className="space-y-4">
          {applications.map(app => (
            <div
              key={app.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Position: {app.opportunity?.title}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    Candidate: Aarav Sharma (AIIA BAMS Senior Scholar)
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Applied: {new Date(app.appliedAt).toLocaleDateString()} • Match Index: 94%
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Current Stage:</span>
                  <select
                    value={app.status}
                    onChange={e => handleUpdateAppStatus(app.id, e.target.value as any)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 outline-hidden"
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="SHORTLISTED">Shortlisted</option>
                    <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                    <option value="ACCEPTED">Offer Accepted</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                <div className="font-bold text-slate-900 dark:text-slate-100">
                  Candidate Statement of Purpose:
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{app.statementOfPurpose}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Opportunity Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Post New Clinical Placement / Internship
              </h3>
              <button
                onClick={() => setShowNewJobModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreatePosting} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Position Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Clinical Research Associate Intern"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Domain
                  </label>
                  <select
                    value={newDomain}
                    onChange={e => setNewDomain(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                  >
                    <option value="AYUSH Clinical Research">Clinical Research</option>
                    <option value="Pharmaceutical QA & GMP">Quality Assurance / Schedule T</option>
                    <option value="Health Informatics">Digital Health & Ayush Grid</option>
                    <option value="Wellness & Panchakarma">Panchakarma Center Administration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mode
                  </label>
                  <select
                    value={newMode}
                    onChange={e => setNewMode(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Monthly Stipend
                  </label>
                  <input
                    type="text"
                    required
                    value={newStipend}
                    onChange={e => setNewStipend(e.target.value)}
                    placeholder="e.g. ₹25,000 / month"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  placeholder="e.g. AIIA Campus, New Delhi"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Job Description & Clinical Responsibilities
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Detail the clinical responsibilities, pharmacovigilance tracking, or lab standardization duties..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingPosting}
                  className="px-5 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {creatingPosting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Publish Posting</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
