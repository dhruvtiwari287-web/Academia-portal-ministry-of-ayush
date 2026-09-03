import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Send,
  Loader2
} from 'lucide-react';
import { Opportunity, Application } from '../../types/index.js';
import { api } from '../../services/api.js';

export const Internships: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState<'EXPLORE' | 'MY_APPLICATIONS'>('EXPLORE');
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');

  // Application Modal state
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [sop, setSop] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [oppRes, appRes] = await Promise.all([
        api.getOpportunities(),
        api.getApplications()
      ]);
      if (oppRes.success) setOpportunities(oppRes.opportunities);
      if (appRes.success) setMyApplications(appRes.applications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenApplyModal = (opp: Opportunity) => {
    setSelectedOpp(opp);
    setSop('');
    setAnswers({});
    setApplySuccess(null);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp || !sop.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.applyOpportunity({
        opportunityId: selectedOpp.id,
        statementOfPurpose: sop,
        answers
      });
      if (res.success) {
        setApplySuccess(res.message);
        await loadData();
        setTimeout(() => {
          setSelectedOpp(null);
          setActiveTab('MY_APPLICATIONS');
        }, 1500);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = opportunities.filter(opp => {
    const matchMode = modeFilter === 'All' || opp.mode === modeFilter;
    const matchDomain = domainFilter === 'All' || opp.domain.toLowerCase().includes(domainFilter.toLowerCase());
    const matchSearch =
      !searchQuery ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchMode && matchDomain && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Applied</span>;
      case 'UNDER_REVIEW':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900">Under Review</span>;
      case 'SHORTLISTED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-900">Shortlisted</span>;
      case 'INTERVIEW_SCHEDULED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">Interview Scheduled</span>;
      case 'ACCEPTED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">Offer Accepted</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <Briefcase className="w-4 h-4" />
          <span>Accredited Healthcare Industry Placements</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          AYUSH Internships, Fellowships & Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Verified industry, research institute, and pharmaceutical postings with transparent skill compatibility matching against your AYUSH Competency Passport.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('EXPLORE')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'EXPLORE'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Explore Postings ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('MY_APPLICATIONS')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'MY_APPLICATIONS'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>My Application Pipeline</span>
            {myApplications.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white dark:bg-slate-900 text-emerald-700">
                {myApplications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'EXPLORE' ? (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by role, organization, keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400">Mode:</span>
                {['All', 'On-site', 'Hybrid', 'Remote'].map(m => (
                  <button
                    key={m}
                    onClick={() => setModeFilter(m)}
                    className={`px-2.5 py-1 rounded text-xs font-medium ${
                      modeFilter === m
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* List of Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(opp => (
              <div
                key={opp.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        {opp.domain} • {opp.organizationType}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                        {opp.title}
                      </h3>
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{opp.organization}</span>
                      </div>
                    </div>

                    {/* Compatibility Match Badge */}
                    <div className="flex-shrink-0 text-right">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{opp.compatibilityScore}% Match</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {opp.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.location} ({opp.mode})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                      <span>Stipend: {opp.stipend}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Explainable Match Breakdown */}
                  {opp.compatibilityBreakdown && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Competency Compatibility:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.compatibilityBreakdown.map((item, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 ${
                              item.matched
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                          >
                            {item.matched ? (
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            )}
                            <span>{item.title}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Card Action */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Eligibility: {opp.eligibility}
                  </span>
                  <button
                    onClick={() => handleOpenApplyModal(opp)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* My Application Pipeline Tab */
        <div className="space-y-4">
          {myApplications.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              You haven't submitted any applications yet.
            </div>
          ) : (
            myApplications.map(app => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      {app.opportunity?.domain}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {app.opportunity?.title}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{app.opportunity?.organization}</span>
                      <span>•</span>
                      <span>Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>{getStatusBadge(app.status)}</div>
                </div>

                {/* Application Timeline History */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Audit Log & Review Notes:
                  </div>
                  <div className="space-y-1.5">
                    {app.history.map((h, i) => (
                      <div key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {h.status}:
                          </span>{' '}
                          {h.note}{' '}
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({new Date(h.timestamp).toLocaleDateString()})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Application Submission Dialog */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Apply for Opportunity
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {selectedOpp.title}
                </h3>
                <div className="text-xs text-slate-500">{selectedOpp.organization}</div>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="px-3 py-1 text-xs text-slate-400 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-5 overflow-y-auto space-y-4">
              {applySuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{applySuccess}</span>
                </div>
              )}

              <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                <span>Your AYUSH Skill Passport will be automatically attached to this application.</span>
                <span className="font-bold">Match Score: {selectedOpp.compatibilityScore}%</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Statement of Purpose / Clinical Motivation
                </label>
                <textarea
                  required
                  rows={4}
                  value={sop}
                  onChange={e => setSop(e.target.value)}
                  placeholder="Describe your academic preparation, clinical exposure, and interest in this specific AYUSH opportunity..."
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              {/* Application Specific Questions */}
              {selectedOpp.applicationQuestions?.map((q, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {q}
                  </label>
                  <input
                    type="text"
                    required
                    value={answers[q] || ''}
                    onChange={e => setAnswers({ ...answers, [q]: e.target.value })}
                    placeholder="Your answer..."
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
              ))}

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOpp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
